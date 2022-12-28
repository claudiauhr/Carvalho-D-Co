//Dependencies
const express = require('express');
const mongoose = require ('mongoose');
const methodOverride = require('method-override');
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
db.on('disconnected', () => console.log('mongod disconnected'));

//Middleware

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));
// extended: false - does not allow nested objects in query strings

app.use(express.json());
// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


// Routes
// Create
app.post('/products' , (req, res) => {
  res.send(req.body);
});

//Listener
app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`)
});
