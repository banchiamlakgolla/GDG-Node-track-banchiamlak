const http = require('http');

const PORT = 4000;

let students = [];
let currentId = 1;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const urlParts = req.url.split('/');
    const id = parseInt(urlParts[2]);

    if (req.method === 'GET' && req.url === '/students') {
        res.end(JSON.stringify(students));
    } 
    else if (req.method === 'POST' && req.url === '/students') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const { name } = JSON.parse(body);
            if (!name) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Name is required' }));
            }
            const newStudent = { id: currentId++, name };
            students.push(newStudent);
            res.end(JSON.stringify(newStudent));
        });
    } 
    else if (req.method === 'PUT' && urlParts[1] === 'students' && id) {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const student = students.find(s => s.id === id);
            if (!student) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: 'Student not found' }));
            }
            const { name } = JSON.parse(body);
            student.name = name || student.name;
            res.end(JSON.stringify(student));
        });
    } 
    else if (req.method === 'DELETE' && urlParts[1] === 'students' && id) {
        const index = students.findIndex(s => s.id === id);
        if (index === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Student not found' }));
        }
        students.splice(index, 1);
        res.end(JSON.stringify({ message: 'Student deleted successfully' }));
    } 
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Student API running at http://localhost:${PORT}`);
});
