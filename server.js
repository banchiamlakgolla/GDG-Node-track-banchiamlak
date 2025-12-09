const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

app.get('/info', (req, res) => {
    res.send('This is the information page');
});

app.post('/submit', (req, res) => {
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
