const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// GET / → Home Page
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

// GET /info → Information Page
app.get('/info', (req, res) => {
    res.send('This is the information page');
});

// POST /submit → Return same JSON
app.post('/submit', (req, res) => {
    const data = req.body;
    res.json(data);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
