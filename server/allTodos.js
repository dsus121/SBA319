// server/allTodos.js
// a direct route that's not plugged into anything
// it's a check to make sure todo data is populating client-side

const Todo = require('../models/todo');

exports.getTodos = async (req, res, next) => {
    try {
        const result = await Todo.find();
        res.json(result);
    } catch (err) {
        next(err);
    }
};
