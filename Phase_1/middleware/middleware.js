const express = require('express');
const app = express();

app.use(express.json());

//logging middleware
app.use((req, res, next) => {
    if (req.method === 'DELETE') {
        res.status(403).json({ error: 'DELETE requests not allowed' });
        return; // don't call next(), block the request
    }
    next(); // allow all other requests
});


// Validation Middleware for POST /login
const validateLogin = (req, res, next) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password required'
        });
    }

    next();
};

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

app.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'This is your profile',
        user: 'Junaid'
    });
});

app.post('/login', validateLogin, (req, res) => {
    res.json({
        message: 'Login successful',
        email: req.body.email
    });
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});