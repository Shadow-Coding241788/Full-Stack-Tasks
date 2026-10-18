import { createRegistrationData } from './registrationStore.js';

export class LegacyRegistration {
  constructor(data = createRegistrationData()) { this.data = structuredClone(data); }
  loadStudent(id, callback) {
    setTimeout(() => {
      const student = this.data.students.find(item => item.id === id);
      if (!student) return callback(new Error('Student does not exist'));
      return callback(null, { ...student, completed: [...student.completed] });
    }, 5);
  }
  checkPrerequisites(student, code, callback) {
    setTimeout(() => {
      const course = this.data.courses.find(item => item.code === code);
      if (!course) return callback(new Error('Course does not exist'));
      if (!student.completed.includes(course.prerequisite)) return callback(new Error('Prerequisite not completed'));
      return callback(null, { student, course: { ...course } });
    }, 5);
  }
  checkAvailableSeats(context, callback) {
    setTimeout(() => {
      if (context.course.seats <= 0) return callback(new Error('Course is full'));
      return callback(null, context);
    }, 5);
  }
  registerCourse(context, callback) {
    setTimeout(() => {
      const { student, course } = context;
      if (this.data.registrations.some(row => row.studentId === student.id && row.course === course.code)) return callback(new Error('Student already registered'));
      // Recheck live seats at the commit boundary to handle concurrent requests.
      const liveCourse = this.data.courses.find(item => item.code === course.code);
      if (!liveCourse || liveCourse.seats <= 0) return callback(new Error('Course is full'));
      const confirmation = { studentId: student.id, course: course.code, status: 'REGISTERED' };
      liveCourse.seats -= 1;
      this.data.registrations.push(confirmation);
      return callback(null, { ...confirmation });
    }, 5);
  }
  register(id, code, callback) {
    this.loadStudent(id, (error, student) => {
      if (error) return callback(error);
      this.checkPrerequisites(student, code, (error, context) => {
        if (error) return callback(error);
        this.checkAvailableSeats(context, (error, available) => {
          if (error) return callback(error);
          this.registerCourse(available, callback);
        });
      });
    });
  }
}

