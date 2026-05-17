const express = require('express');

const app = express();

app.use(express.json());

// Auth Middleware - checks if token exists
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            error: 'No token provided. Unauthorized.'
        });
    }

    next();
};


const validateTask = (req, res, next) => {
    const { title, description } = req.body || {};

    if (!title || !description) {
        return res.status(400).json({
            error: 'Title and description required.'
        });
    }

    next();
};

app.post('/tasks', authMiddleware, validateTask, (req, res) => {
    res.json({
        message: 'Task created successfully',
        task: {
            title: req.body.title,
            description: req.body.description
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});