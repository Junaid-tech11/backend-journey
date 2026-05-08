// Import the built-in http module from Node.js
// This gives us the tools to create a web server
const http = require('http');

// createServer takes a function that runs every time
// someone makes a request to our server
// req = request (what the user is asking for)
// res = response (what we send back)
const server = http.createServer((req, res) => {

    // Log every incoming request to the terminal
    // req.method = GET, POST, PUT, DELETE
    // req.url = which page they visited
    console.log(req.method, req.url);

    // Check which URL the user visited
    // and respond accordingly
    if (req.url === '/' && req.method === 'GET') {

        // 200 means "everything is OK"
        // Content-Type tells the browser what kind of data we're sending
        res.writeHead(200, { 'Content-Type': 'application/json' });

        // We can't send a JavaScript object directly over the internet
        // JSON.stringify() converts the object into a string
        res.end(JSON.stringify({
            message: 'Welcome to my API',
            author: 'Junaid',
            version: '1.0',
            // Arrays work inside JSON too
            routes: ['/about', '/services', '/contact']
        }));

    } else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            page: 'About',
            description: 'This is my backend server',
            author: 'Junaid'
        }));

    } else if (req.url === '/contact' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            page: 'Contact',
            email: 'junaid@example.com'
        }));

    } else if (req.url === '/services' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            page: 'Services',
            description: 'Our services include web development, mobile app development, and digital marketing.',
            author: 'Junaid'
        }));

    } else {
        // If no route matches, send 404
        // 404 means "page not found"
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: '404 Not Found',
            message: 'The page you are looking for does not exist'
        }));
    }
});

// Tell the server to start listening on port 3000
// A port is like a door on your computer
// Port 3000 is the door our server sits behind
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});