// mongo.js - setting up the MongoDB connection

const { MongoClient } = require('mongodb');

const uri = 'MONGODB_URI';
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('trails_data');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB().then(db => {
  // Use the db object to interact with your database
});

async function storeDataInMongoDB(db, trails) {
    try {
      const collection = db.collection('trails');
      await collection.insertMany(trails);
      console.log('Data stored in MongoDB');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }
  
  // Example usage
  connectToMongoDB().then(db => {
    fetchData().then(data => { // calling the fetchData function
      storeDataInMongoDB(db, data); // calling the storeDataInMongoDB function
    });
  });
  
  //////// dynamic Mongo code  ///////////
//   const mongoose = require('mongoose');

// const dynamicSchema = new mongoose.Schema({}, { strict: false });

// const getModel = (collectionName) => {
//   return mongoose.model(collectionName, dynamicSchema, collectionName);
// };

// module.exports = getModel;

// make sure the line below is in the index.js
// import { MongoClient } from 'mongodb';
