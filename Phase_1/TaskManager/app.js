const express = require('express');

const app = express();

app.use(express.json());

const tasks = [];
let nextId = 1;

app.post('/tasks', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;

    // validation
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    if (!description) {
        return res.status(400).json({ message: 'Description is required' });
    }
    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }



    const task = {
        id: nextId,
        title: title,
        description: description,
        status: status
    }
    tasks.push(task);
    nextId = nextId + 1;

    res.status(201).json(task);

})

app.get('/tasks', (req, res) => {

    res.json(tasks);
})

app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (task) {
        res.json({
            tasks: task
        })

    }
    else {
        res.status(404).json({ message: 'Task not found' });
    }
})

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' })
        tasks.splice(index, 1)
    }
    tasks.splice(index, 1)
    res.json({ message: 'Task deleted successfully' })
})

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // update only fields that were sent
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    res.json(task);
});

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);

});