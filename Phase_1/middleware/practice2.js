const express = require('express');

const app = express();


app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);

    next();
});


const authMiddleware = (req, res, next) => {
    const token = req.headers.name;

    if (!token) {
        return res.status(400).json({
            error: 'No token provided. Unauthorized.'
        });
    }

    next();
};


app.get('/welcome', authMiddleware, (req, res) => {
    res.json({
        message: `Welcome ${req.headers.name}`
    });
});


app.post('/data', (req, res) => {
    const validates = req.body.message;

    if (!validates) {
        return res.status(400).json({ error: 'Message is required' });
    }
    res.json({
        message: validates
    })
})


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});