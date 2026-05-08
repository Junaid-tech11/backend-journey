// import the express package 
const express = require('express');

// app is entire server--- routes, setting, everything lives on it
const app = express();

//it is middleware it tells express--Whenever someone sends JSON data in their request
//body automatically parse it for me without using res.json but if someone sends you data via POST you can't read it
app.use(express.json());


//its a routing here app.get means listen for GET request only '/' is the route
//the function runs res.json convert the object and sends it back,no JSON>stringify needed
app.get('/', (req, res) => {
    res.json({ message: "Welcome to my API", author: 'Junaid' });
});

app.get('/about', (req, res) => {
    res.json({ message: 'Junaid Abbasi', role: 'Student', university: 'Virtual' });
});

app.get('/skills', (req, res) => {
    res.json({
        skills: ['Backend Developer', 'Ai automation']
    });
});


app.post('/contact', (req, res) => {
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    res.json({
        status: 'Message received',
        from: name,
        email: email,
        yourMessage: message
    });
});


//now here we are defined are dynamic routing for endless users
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        message: 'User Found!',
        userId: id
    });
});


//multiple parameters in one route:
app.get('/users/:userId/posts/:postId', (req, res) => {
    console.log(req.params);
    res.json({
        userId: req.params.userId,
        postId: req.params.postId
    })
})

//query string parameters are used to filter or sort data, they come after the ? in the URL
// app.get('/users', (req, res) => {
//     console.log(req.query);

//     const sort = req.query.sort;
//     const limit = req.query.limit;

//     res.json({
//         message: 'Users list',
//         sort: sort,
//         limit: limit
//     });

// });

// app.get('/users/:id/posts', (req, res) => {
//     res.json({
//         userId: req.params.id,
//         sort: req.query.sort,
//         limit: req.query.limit,
//         page: req.query.page
//     })
// })

app.get('/users', (req, res) => {
    const sort = req.query.sort || 'name';
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    res.json({
        message: 'Users list',
        sort: sort,
        limit: limit,
        page: page
    })
})

//its a port no which browser runs
app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);

});