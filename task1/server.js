const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET' && req.url === '/') {
        res.end(JSON.stringify({ message: 'Welcome to the Home Page' }));
    } else if (req.method === 'GET' && req.url === '/info') {
        res.end(JSON.stringify({ message: 'This is the information page' }));
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            res.end(body); // Echo back JSON
        });
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Basic HTTP server running at http://localhost:${PORT}`);
});
