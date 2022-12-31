//Dependencies
const express = require('express');
const mongoose = require ('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');
const golden = require('./golden');
require('dotenv').config()

const app = express();

// Database Configuration
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Database Connection - Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));


// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Seed Route
app.get('/products/seed', (req, res) => {
  Product.deleteMany({}, (error, allProducts) => {
    Product.create(golden, (error) => {
      res.redirect('/products');
    });
  });
});

// Induces
// Index
app.get('/products', (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render('index.ejs', {
      products: allProducts,
    });
  });
});

// New
app.get ('/products/new', (req, res) => {
  res.render('new.ejs');
});

// Delete
app.delete('/products/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id, (error, deleteProduct) => {
    res.redirect('/products');
  });
});

// Update
app.put('/products/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, 
    {'name': req.body.name, 'description':req.body.description, 'price':parseInt(req.body.price)}, 
    { new: true },(error, product) => {
    res.render('show.ejs', {product});
  });
})

// Create
app.post('/products', (req, res) => {
  Product.create(req.body, (error, createProduct) => {
    res.redirect('/products');
  })
});

// Edit
app.get('/products/:id/edit', (req, res) => {
  Product.findById(req.params.id, (err, product) =>{
    res.render('edit.ejs', { product: product });
  });
});

// Show
app.get('/products/:id', (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    res.render('show.ejs', { 
      product: product 
    });
  });
});

//Listener
app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`)
});

