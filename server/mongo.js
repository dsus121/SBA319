// mongo.js - all the bits to connect to MongoDB
const path = require('path');

require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;
    // console.log('Mongo_URI:', mongoURI);
    if (!mongoURI) {
        console.error('MongoDB connection error: MONGO_URI is undefined.');
        process.exit(1);
    }
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// process.exit is a method provided by Node.js that terminates the current process.

// This method takes an optional argument, which is the exit code. The exit code is a number that is returned to the operating system when the process exits.

// process.exit(0): This would terminate the process and indicate that it completed successfully.

// process.exit(1): This would terminate the process and indicate that there was an error.



module.exports = connectDB;
