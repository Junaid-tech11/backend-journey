const express = require('express');
const app = express();

app.use(express.json());

// In-memory database
let notes = [];

// =============================
// CREATE NOTE
// POST /api/v1/notes
// =============================
app.post('/api/v1/notes', (req, res) => {
    const { title, content, category } = req.body;

    // Validation
    if (!title || !content) {
        return res.status(400).json({
            message: 'Title and content are required'
        });
    }

    const newNote = {
        id: notes.length + 1,
        title,
        content,
        category: category || 'general'
    };

    notes.push(newNote);

    res.status(201).json(newNote);
});

// =============================
// GET ALL NOTES
// GET /api/v1/notes
// =============================
app.get('/api/v1/notes', (req, res) => {
    res.status(200).json(notes);
});

// =============================
// GET SINGLE NOTE
// GET /api/v1/notes/:id
// =============================
app.get('/api/v1/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const note = notes.find(n => n.id === id);

    if (!note) {
        return res.status(404).json({
            message: 'Note not found'
        });
    }

    res.status(200).json(note);
});

// =============================
// UPDATE NOTE
// PUT /api/v1/notes/:id
// =============================
app.put('/api/v1/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const note = notes.find(n => n.id === id);

    if (!note) {
        return res.status(404).json({
            message: 'Note not found'
        });
    }

    const { title, content, category } = req.body;

    note.title = title || note.title;
    note.content = content || note.content;
    note.category = category || note.category;

    res.status(200).json(note);
});

// =============================
// DELETE NOTE
// DELETE /api/v1/notes/:id
// =============================
app.delete('/api/v1/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = notes.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Note not found'
        });
    }

    notes.splice(index, 1);

    res.status(200).json({
        message: 'Note deleted successfully'
    });
});

// =============================
// PREVIEW NOTE
// GET /api/v1/notes/:id/preview
// =============================
app.get('/api/v1/notes/:id/preview', (req, res) => {
    const id = parseInt(req.params.id);

    const note = notes.find(n => n.id === id);

    if (!note) {
        return res.status(404).json({
            message: 'Note not found'
        });
    }

    res.status(200).json({
        id: note.id,
        title: note.title,
        category: note.category
    });
});

// =============================
// CATCH-ALL ROUTE
// =============================
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

// =============================
// SERVER
// =============================
app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);

});