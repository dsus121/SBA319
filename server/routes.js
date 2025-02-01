// routes.js - additional routes if necessary

const express = require("express");
const router = express.Router();

// home route
router.get("/", function (req, res) {
  res.send("home page");
});

// about route
router.get("/about", function (req, res) {
  res.send("about page");
});

const todo = require('../models/todo');

// CREATE a new to-do item (favorite a trail or add a planned hike)
router.post('/todos', async (req, res) => {
    try {
        const todo = new todo({
            user_id: req.body.user_id,
            trail_id: req.body.trail_id,
            planned_date: req.body.planned_date,
            checklist: req.body.checklist,
            notes: req.body.notes,
            favorite: req.body.favorite
        });
        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ all to-do items for a user
router.get('/todos', async (req, res) => {
    try {
        const todos = await todo.find({ user_id: req.query.user_id }).populate('trail_id');
        res.send(todos);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE a to-do item by ID
router.patch('/todos/:id', async (req, res) => {
    try {
        const todo = await todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE a to-do item by ID
router.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;