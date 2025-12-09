const express = require('express');
const app = express();
const PORT = 4000;

// Middleware to parse JSON
app.use(express.json());

// In-memory array for students
let students = [];
let currentId = 1; // Unique ID generator

// GET /students → return all students
app.get('/students', (req, res) => {
    res.json(students);
});

// POST /students → add new student
app.post('/students', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const newStudent = { id: currentId++, name };
    students.push(newStudent);
    res.json(newStudent);
});

// PUT /students/:id → update student
app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const { name } = req.body;

    const student = students.find(s => s.id === studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.name = name || student.name;
    res.json(student);
});

// DELETE /students/:id → delete student
app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === studentId);

    if (index === -1) return res.status(404).json({ error: 'Student not found' });

    students.splice(index, 1);
    res.json({ message: 'Student deleted successfully' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Student API running at http://localhost:${PORT}`);
});
