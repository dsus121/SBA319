// index.js - main server file

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));  // serve files from the public directory

app.listen(PORT, () => {
    console.log(`Server is operational on port ${PORT}`);
});