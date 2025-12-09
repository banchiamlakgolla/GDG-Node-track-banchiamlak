const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

let students = [];
let currentId = 1;

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const newStudent = { id: currentId++, name };
    students.push(newStudent);
    res.json(newStudent);
});

app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.name = req.body.name || student.name;
    res.json(student);
});

app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === studentId);
    if (index === -1) return res.status(404).json({ error: 'Student not found' });

    students.splice(index, 1);
    res.json({ message: 'Student deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Student API running at http://localhost:${PORT}`);
});
