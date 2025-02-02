// populateData.js - will call manually to populate user data

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const connectDB = require('./mongo');
const User = require('../models/user');

const users = [
    { name: "Bilbo Baggins", race: "Hobbit", gender: "Male" },
    { name: "Gandalf", race: "Maiar", gender: "Male" },
    { name: "Thorin Oakenshield", race: "Dwarf", gender: "Male" },
    { name: "Kili", race: "Dwarf", gender: "Male" },
    { name: "Fili", race: "Dwarf", gender: "Male" },
    { name: "Balin", race: "Dwarf", gender: "Male" },
    { name: "Dwalin", race: "Dwarf", gender: "Male" },
    { name: "Oin", race: "Dwarf", gender: "Male" },
    { name: "Gloin", race: "Dwarf", gender: "Male" },
    { name: "Dori", race: "Dwarf", gender: "Male" },
    { name: "Nori", race: "Dwarf", gender: "Male" },
    { name: "Ori", race: "Dwarf", gender: "Male" },
    { name: "Bifur", race: "Dwarf", gender: "Male" },
    { name: "Bofur", race: "Dwarf", gender: "Male" },
    { name: "Bombur", race: "Dwarf", gender: "Male" },
    { name: "Frodo Baggins", race: "Hobbit", gender: "Male" },
    { name: "Samwise Gamgee", race: "Hobbit", gender: "Male" },
    { name: "Aragorn", race: "Human", gender: "Male" },
    { name: "Eowyn", race: "Human", gender: "Female" },
    { name: "Legolas", race: "Elf", gender: "Male" },
    { name: "Gimli", race: "Dwarf", gender: "Male" },
    { name: "Boromir", race: "Human", gender: "Male" },
    { name: "Meridoc Brandybuck", race: "Hobbit", gender: "Male" },
    { name: "Perigrin Took", race: "Hobbit", gender: "Male" },
    { name: "Smeagol", race: "Stoor Hobbit", gender: "Male" },
    { name: "Galadriel", race: "Elf", gender: "Female" },
    { name: "Rand al'Thor", race: "Human", gender: "Male" },
    { name: "Mat Cauthon", race: "Human", gender: "Male" },
    { name: "Perrin Aybara", race: "Human", gender: "Male" },
    { name: "Egwene al'Vere", race: "Human", gender: "Female" },
    { name: "Nynaeve al'Meara", race: "Human", gender: "Female" },
    { name: "Lan Mandragoran", race: "Human", gender: "Male" },
    { name: "Moiraine Sedai", race: "Human", gender: "Female" },
    { name: "Thom Merrilin", race: "Human", gender: "Male" },
    { name: "Aviendha", race: "Human", gender: "Female" },
    { name: "Elayne Trakand", race: "Human", gender: "Female" },
    { name: "Loial, the Ogier", race: "Ogier", gender: "Male" },
    { name: "Walter Mitty", race: "Human", gender: "Male" },
    { name: "Buck", race: "Dog", gender: "Male" },
    { name: "Shadow", race: "Dog", gender: "Male" },
    { name: "Sassy", race: "Cat", gender: "Female" },
    { name: "Chance", race: "Dog", gender: "Male" }
];



async function createUsers() {
    await connectDB();

    let createdCount = 0; // counter to keep track of the number of users created
    const failedUsers = [];

    for (const user of users) {
        try {
          const newUser = new User(user);
          await newUser.save();
            createdCount++;
        } catch (error) {
        console.log('Error saving user:', error);
        failedUsers.push(user);
        }
    }
    console.log(`Total users created: ${createdCount}`);
    console.log(`Total users failed: ${failedUsers.length}`);
    if (failedUsers.length > 0) {
        console.log('Failed users:', failedUsers);
    }

    mongoose.disconnect();
}

createUsers();
