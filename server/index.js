// server/index.js - main server file

const path = require('path');

// console.log('Before dotenv config:');
// console.log(process.env.MONGO_URI); // pre - adding to figure out why the connection isn't working

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
// console.log('After dotenv config:');
// console.log(process.env.MONGO_URI); // post - adding to figure out why the connection isn't working

const PORT = process.env.PORT || 3000;
const express = require('express');
const connectDB = require('./mongo');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();

// view engine
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// serve static files from the public folder
app.use(express.static(path.join(__dirname, '..', 'public'))); 

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


// routes
app.use('/', routes);

// handling 404 errors
app.use((req, res, next) => {
    res.status(404).render('404error'); 
});

//  more middleware, but for handling errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).send('Sorry! The goats ate everything!');
});

// connect to MongoDB
connectDB();

// start the server
app.listen(PORT, () => {
    console.log(`Server is climbing mountains on port ${PORT}`);
});