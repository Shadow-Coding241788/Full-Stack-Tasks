// Each demo gets independent state; no functions return state-retaining functions.
export function createRegistrationData() {
  return {
    students: [{ id: 101, completed: ['CS301'] }, { id: 102, completed: [] }],
    courses: [{ code: 'CS401', prerequisite: 'CS301', seats: 2 }, { code: 'FULL', prerequisite: 'CS301', seats: 0 }],
    registrations: []
  };
}

