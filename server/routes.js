// server/routes.js - all the routes > user, trail, todo

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Trail = require("../models/trail");
const Todo = require("../models/todo");


// home route - populates the dropdown to select a user
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).lean();
    res.render("index", { users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
});

// about route
// router.get("/about", function (req, res) {
//   res.send("about page");
// });

// read user data, wrap in a try/catch
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    const trails = await Trail.find({}).lean();
    // console.log("Trails:", trails);  // adding to check trails data
    console.log("Trails data fetched successfully");
    const todos = await Todo.find({ user_id: req.params.id }).populate('trail_id').lean();
    res.render("user", { user, trails, todos });
  } catch (err) {
    console.error("Error fetching user or trails:", err);
    res.status(500).send("Server error");
  }
});

// user route - display user-specific information
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("user", { user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send("Server error");
  }
});

// read trails data, wrap in a try/catch
router.get("/trails", async (req, res) => {
  try {
    const trails = await Trail.find({});
    res.send(trails);
  } catch (error) {
    res.status(500).send(error);
  }
});

// read trail data, wrap in a try/catch
router.get("/trail/:id", async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id).lean();
    if (!trail) {
      return res.status(404).send();
    }
    res.send(trail);
  } catch (error) {
    console.error("Error fetching trail:", err);
    res.status(500).send("Server error");
  }
});
// begin CRUD functionality
// READ todo data
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({ user_id: req.query.user_id }).populate(
      "trail_id"
    ).lean();
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// CREATE a new to-do item (favorite a trail or add a planned hike)
router.post("/todos", async (req, res) => {
  try {
    const todo = new Todo({
      user_id: req.body.user_id,
      trail_id: req.body.trail_id,
      planned_date: req.body.planned_date,
      checklist: req.body.checklist,
      notes: req.body.notes,
      favorite: req.body.favorite,
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ all to-do items for a user
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({ user_id: req.query.user_id }).populate(
      "trail_id"
    );
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE a to-do item by ID
router.patch("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE a to-do item by ID
router.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
