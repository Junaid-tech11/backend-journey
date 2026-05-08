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
const express = require('express');

const app = express();

app.use(express.json());


app.post('/products', (req, res) => {

    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;

    res.json({
        name: name,
        price: price,
        ProductCategory: category
    })
})

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);

});