

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Task = require('./models/Task');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.log('Connection failed:', err.message));

app.get('/', (req, res) => {
    res.json({ message: 'Task Manager API with MongoDB' });
});

app.post('/api/v1/tasks', async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        });

        await task.save();
        res.status(201).json(task);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.get('/api/v1/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/v1/tasks/:id', async (req, res) => {
    try {
        // Step 1 - get id from URL
        const id = req.params.id;

        // Step 2 - find in database
        const task = await Task.findById(id);

        // Step 3 - if not found
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Step 4 - send back
        res.status(200).json(task);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/v1/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const task = await Task.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete('/api/v1/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });

        }
        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 