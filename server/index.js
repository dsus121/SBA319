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

const app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public'))); 

// Middleware
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', routes);

//  more middleware, but for handling errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).send('Sorry! The goats ate your homework.');
});

// connect to MongoDB
connectDB();

// start the server
app.listen(PORT, () => {
    console.log(`Server is climbing mountains on port ${PORT}`);
});