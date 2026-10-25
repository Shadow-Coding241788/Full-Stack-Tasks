
const http = require('node:http');

const students = [];
const teachers = [];
const attendance = [];
const marks = [];

let studentId = 1;
let teacherId = 1;
let attendanceId = 1;
let marksId = 1;

const modules = {
    students: { data: students, nextId: () => studentId++ },
    teachers: { data: teachers, nextId: () => teacherId++ },
    attendance: { data: attendance, nextId: () => attendanceId++ },
    marks: { data: marks, nextId: () => marksId++ }
};

// STEP 1: CREATE SERVER
const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost:3002');
    const parts = url.pathname.split('/').filter(Boolean);

    const reply = (code, body) => {
        res.writeHead(code, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(body));
    };

    const getBody = () => new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => body += chunk);

        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch {
                reject(new Error('Invalid JSON'));
            }
        });
    });

    const module = modules[parts[0]];
    const id = parts[1] ? Number(parts[1]) : null;

    if (!module) {
        return reply(404, { error: 'Module not found' });
    }

    if (parts.length > 2 || (parts[1] && (!Number.isInteger(id) || id <= 0))) {
        return reply(400, { error: 'Invalid route or ID' });
    }

    try {
        // READ ALL
        if (req.method === 'GET' && id === null) {
            return reply(200, module.data);
        }

        // READ ONE
        if (req.method === 'GET' && id !== null) {
            const record = module.data.find(item => item.id === id);

            return record
                ? reply(200, record)
                : reply(404, { error: 'Record not found' });
        }

        // CREATE
        if (req.method === 'POST' && id === null) {
            const body = await getBody();

            if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length === 0) {
                return reply(400, { error: 'Data is required' });
            }

            const record = {
                ...body,
                id: module.nextId()
            };

            module.data.push(record);

            return reply(201, {
                message: 'Record created successfully',
                data: record
            });
        }

        // UPDATE
        if (req.method === 'PUT' && id !== null) {
            const body = await getBody();

            if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length === 0) {
                return reply(400, { error: 'Update data is required' });
            }

            const index = module.data.findIndex(item => item.id === id);

            if (index === -1) {
                return reply(404, { error: 'Record not found' });
            }

            module.data[index] = {
                ...module.data[index],
                ...body,
                id
            };

            return reply(200, {
                message: 'Record updated successfully',
                data: module.data[index]
            });
        }

        // DELETE
        if (req.method === 'DELETE' && id !== null) {
            const index = module.data.findIndex(item => item.id === id);

            if (index === -1) {
                return reply(404, { error: 'Record not found' });
            }

            const deleted = module.data.splice(index, 1);

            return reply(200, {
                message: 'Record deleted successfully',
                data: deleted[0]
            });
        }

        reply(405, { error: 'Method not allowed' });

    } catch (error) {
        reply(400, { error: error.message });
    }
});

// STEP 2: START SERVER
server.listen(3002, async () => {
    console.log('Student Management Server running at http://localhost:3002');

    // STEP 3: TEST API USING FETCH
    const BASE_URL = 'http://localhost:3002';

    async function request(method, path, body) {
        const response = await fetch(BASE_URL + path, {
            method,
            headers: { 'Content-Type': 'application/json' },
            ...(body ? { body: JSON.stringify(body) } : {})
        });

        const data = await response.json();

        console.log(`\n${method} ${path}`);
        console.log(data);

        return data;
    }

    try {
        console.log('\n========== STUDENT CRUD ==========');

        await request('POST', '/students', {
            name: 'Ali',
            age: 20,
            department: 'Computer Science'
        });

        await request('GET', '/students');
        await request('GET', '/students/1');

        await request('PUT', '/students/1', {
            age: 21
        });

        await request('DELETE', '/students/1');

        console.log('\n========== TEACHER CRUD ==========');

        await request('POST', '/teachers', {
            name: 'Ahmed',
            subject: 'Programming'
        });

        await request('GET', '/teachers');
        await request('GET', '/teachers/1');

        await request('PUT', '/teachers/1', {
            subject: 'Database'
        });

        await request('DELETE', '/teachers/1');

        console.log('\n========== ATTENDANCE CRUD ==========');

        await request('POST', '/attendance', {
            studentId: 1,
            date: '2026-10-25',
            status: 'Present'
        });

        await request('GET', '/attendance');
        await request('GET', '/attendance/1');

        await request('PUT', '/attendance/1', {
            status: 'Absent'
        });

        await request('DELETE', '/attendance/1');

        console.log('\n========== MARKS CRUD ==========');

        await request('POST', '/marks', {
            studentId: 1,
            subject: 'Data Structures',
            marks: 85,
            total: 100
        });

        await request('GET', '/marks');
        await request('GET', '/marks/1');

        await request('PUT', '/marks/1', {
            marks: 90
        });

        await request('DELETE', '/marks/1');

        console.log('\nAll CRUD operations completed successfully!');

    } catch (error) {
        console.error('Fetch error:', error.message);
    }
});
