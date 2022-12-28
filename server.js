//Dependencies
const express = require('express');
const mongoose = require ('mongoose');
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
app.use(express.urlencoded({ extended: true }));
// extended: false - does not allow nested objects in query strings

// Routes
// New
// app.get('/products/new', (req,res) => {
  // res.send('new');
// });

// Create
app.post('/products', (req, res) => {
  if(req.body.completed === 'on') {
    req.body.completed = true;
  } else {
    req.body.completed = false;
  }
  res.send(req.body);
  });

//Listener
app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`)
});
