// const express = require('express');

// const app = express();

// app.use(express.json());

// app.get('/products/:productId', (req, res) => {

//     const productId = req.params.productId;
//     const category = req.query.category;

//     res.json({
//         productId: productId,
//         category: category
//     });

// });

// app.listen(3000, () => {
//     console.log(`Server running on http://localhost:3000`);

// });

//2


// const express = require('express');

// const app = express();

// app.use(express.json());


// app.post('/products', (req, res) => {

//     const name = req.body.name;
//     const price = req.body.price;
//     const category = req.body.category;

//     res.json({
//         name: name,
//         price: price,
//         ProductCategory: category
//     })
// })

// app.listen(3000, () => {
//     console.log(`Server running on http://localhost:3000`);

// });


const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {

    res.json({
        'message': 'Day 3 API',
        'author': 'Junaid',
    })


})

app.get('/users/:id', (req, res) => {
    console.log(req.params);
    res.json({
        userId: req.params.id,
        role: req.query.role
    })
})

app.post('/login', (req, res) => {
    console.log(req.body);

    const email = req.body.email;
    res.json({

        email: email,

    });
});



app.get('/products', (req, res) => {
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


app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);

});