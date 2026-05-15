const express = require('express');
const app = express();


app.use(express.json());

let notes = [
    {
        id: 1,
        title: "Test Note",
        content: "Learning backend",
        category: "study"
    }
];

app.get('/', (req, res) => {
    res.send('Hello Junaid, your server is live!');
});

app.get('/api/v1/notes', (req, res) => {
    res.json(notes);

});

app.post('/api/v1/notes', (req, res) => {
    const { title, content, category } = req.body;

    const newNote = {
        id: notes.length + 1,
        title,
        content,
        category: category || "general"
    };

    notes.push(newNote);

    res.status(201).json(newNote);
});


app.get('/api/v1/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const note = notes.find(n => n.id === id);

    if (!note) {
        return res.status(404).json({
            message: 'Note not found'
        });
    }

    res.json(note);
});


app.listen(5000, () => {
    console.log('Server running on http://localhost:5000 ');
});