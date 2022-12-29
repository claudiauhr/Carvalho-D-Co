//Dependencies
const express = require('express');
const mongoose = require ('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');
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
// Body parser middleware: give us access to req.body
// extended: false - does not allow nested objects in query strings
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes - Induces

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
  res.send('deleting 3, 2, 1...')
});

// Create
app.post('/products', (req, res) => {
  Product.create(req.body, (error, createProduct) => {
    res.redirect('/products');
  })
});

// Show
app.get('/products/:id', (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render('show.ejs', {
      product: foundProduct
    });
  });
});

//Listener
app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`)
});
