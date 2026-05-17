const express = require('express');

const app = express();

const students = [];
app.use(express.json());


//Global middleware runs for everyone
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);

    next();


});

//Specific- defined but attached to routes later

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            error: 'no Token Provided Unauthorized User!'
        })
    }
    next();
};



const validateStudent = (req, res, next) => {
    const { name, age } = req.body || {};

    if (!name || !age) {
        return res.status(400).json({
            error: 'name and age is required'
        })
    }
    next();
}


app.post('/api/v1/students', authMiddleware, validateStudent, (req, res) => {
    const newStudent = {
        id: Date.now(),
        name: req.body.name,
        age: req.body.age
    }
    students.push(newStudent);
    res.json(newStudent);
})

app.get('/api/v1/students', (req, res) => {
    res.json(students);
})

app.get('/api/v1/students/:id', authMiddleware, (req, res) => {
    let id = parseInt(req.params.id);

    let student = students.find(n => n.id === id);

    if (!student) {
        return res.status(404).json({
            message: 'student not found'
        });
    }

    res.status(200).json(student);
});




app.put('/api/v1/students/:id', authMiddleware, validateStudent, (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(n => n.id === id);

    if (!student) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }

    const { name, age } = req.body;

    student.name = name || student.name;
    student.age = age || student.age;

    res.status(200).json(student);
});

app.get('/api/v1/students/:id/summary', authMiddleware, (req, res) => {
    let id = parseInt(req.params.id);

    const student = students.find(n => n.id === id);

    if (!student) {
        return res.status(404).json({
            message: 'student not found'
        });
    }

    res.status(200).json({ summary: `${student.name} is ${student.age} years old.` });
});



app.delete('/api/v1/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }

    students.splice(index, 1);

    res.status(200).json({
        message: 'Student deleted successfully'
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});