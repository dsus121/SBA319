const mongoose = require('mongoose');
const User = require('./models/user');
const Todo = require('./models/todo');
const Trail = require('./models/trail');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const users = [
    'Bilbo Baggins', 'Gandalf', 'Thorin Oakenshield', 'Kili', 'Fili', 'Balin', 'Dwalin',
    'Oin', 'Gloin', 'Dori', 'Nori', 'Ori', 'Bifur', 'Bofur', 'Bombur', 'Frodo Baggins',
    'Samwise Gamgee', 'Aragorn', 'Legolas', 'Gimli', 'Boromir', 'Meridoc Brandybuck',
    'Perigrin Took', 'Smeagol', 'Rand al\'Thor', 'Mat Cauthon', 'Perrin Aybara',
    'Egwene al\'Vere', 'Nynaeve al\'Meara', 'Lan Mandragoran', 'Moiraine Sedai',
    'Thom Merrilin', 'Aviendha', 'Elayne Trakand', 'Loial, the Ogier', 'Walter Mitty',
    'Buck', 'Shadow', 'Sassy', 'Chance'
];

async function createUsers() {
    for (const name of users) {
        const user = new User({ name });
        await user.save();
    }
    console.log('Users created');
    mongoose.disconnect();
}

createUsers();
