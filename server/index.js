// index.js - main server file

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');

// middleware
app.use('/', routes);

//  more middleware, but for handling errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).send('Something went wrong!');
});


// view engine
app.set('view engine', 'ejs');

// serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public'))); 

// start the server
app.listen(PORT, () => {
    console.log(`Server is climbing mountains on port ${PORT}`);
});