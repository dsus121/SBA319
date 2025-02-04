// server/populatePackingLists.js - set up each user's inventory
// based on race and gender
// used only once in the beginning to populate inventories

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const connectDB = require('./mongo');
const User = require('../models/user');

const packingLists = {
    "Hobbit": {
        "Male": ["Pipe", "Cloak", "Food supplies", "Map"],
        "Female": ["Cloak", "Food supplies", "Journal", "Map"]
    },
    "Maiar": {
        "Male": ["Staff", "Cloak", "Book of spells"],
        "Female": ["Staff", "Cloak", "Book of spells"]
    },
    "Dwarf": {
        "Male": ["Axe", "Armor", "Rations", "Map"],
        "Female": ["Axe", "Armor", "Rations", "Map"]
    },
    "Human": {
        "Male": ["Sword", "Shield", "Provisions", "Map"],
        "Female": ["Dagger", "Cloak", "Provisions", "Map"]
    },
    "Elf": {
        "Male": ["Bow", "Quiver", "Elven bread", "Map"],
        "Female": ["Bow", "Quiver", "Elven bread", "Map"]
    },
    "Stoor Hobbit": {
        "Male": ["Precious ring", "Cloak", "Rations", "Map"],
        "Female": ["Cloak", "Rations", "Map"]
    },
    "Ogier": {
        "Male": ["Books", "Journal", "Cloak", "Map"],
        "Female": ["Books", "Journal", "Cloak", "Map"]
    },
    "Dog": {
        "Male": ["Collar", "Bone"],
        "Female": ["Scarf", "Bone"]
    },
    "Cat": {
        "Male": ["Collar", "Extra Mouse"],
        "Female": ["Pretty Collar", "Extra Mouse"]
    }
};

const ringHolders = ["Smeagol", "Bilbo Baggins", "Frodo Baggins"];


async function populatePackingLists() {
    await connectDB();

    try {
        const users = await User.find({});

        for (const user of users) {
            const race = user.race;
            const gender = user.gender;
            if (packingLists[race] && packingLists[race][gender]) {
                user.packingList = [...packingLists[race][gender]];
                if (ringHolders.includes(user.name)) {
                    user.packingList.push("Precious ring");
                }
                await user.save();
                console.log(`Packing list added for ${user.name}`);
            }
        }

        console.log('Packing lists populated for all users.');
    } catch (error) {
        console.error('Error populating packing lists:', error);
    } finally {
        mongoose.disconnect();
    }
}

populatePackingLists();
