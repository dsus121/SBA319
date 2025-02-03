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
    const todos = await Todo.find({ user_id: req.params.id })
      .populate("trail_id")
      .lean();
    res.render("user", { user, trails, todos });
  } catch (err) {
    console.error("Error fetching user or trails:", err);
    res.status(500).send("Server error");
  }
});

// user route - display user-specific information
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    const trails = await Trail.find({}).lean();
    const todos = await Todo.find({ user_id: req.params.id })
      .populate("trail_id")
      .lean();
    res.render("user", { user, trails, todos });
  } catch (err) {
    console.error("error fetching user or trails:", err);
    res.status(500).send("server error");
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
    const trail = await Trail.findById(req.params.id);
    if (!trail) {
      return res.status(404).json({ error: "Trail not found" });
    }
    res.json(trail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// begin CRUD functionality
// READ todo data

// read all to-do items for a user
router.get("/user/:id/todos", async (req, res) => {
  try {
    const todos = await Todo.find({ user_id: req.params.id })
      .populate("trail_id")
      .lean();
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.render("todo", { user, todos });
  } catch (error) {
    console.error("error fetching todos:", error);
    res.status(500).json({ error: "server error" });
  }
});

// create a new to-do item (plan a trail)
router.post("/todos", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Log the received request body
    const { user_id, trail_id, planned_date, checklist, notes } = req.body;

    if (!user_id) {
      console.log("Missing user_id");
    }

    if (!trail_id) {
      console.log("Missing trail_id");
    }

    if (!user_id || !trail_id) {
      return res.status(400).json({ error: "missing required fields" });
    }

    const todo = new Todo({
      user_id,
      trail_id,
      planned_date,
      checklist,
      notes,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error("error creating to-do:", error);
    res.status(400).json({ error: "server error" });
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
      const { planned_date, notes, checklist } = req.body;
      const todo = await Todo.findByIdAndUpdate(req.params.id, {
        planned_date,
        notes,
        checklist: checklist.split(',').map(item => item.trim()), // Split and trim checklist items
      }, { new: true });
  
      if (!todo) {
        return res.status(404).json({ error: 'To-do item not found' });
      }
  
      res.json(todo);
    } catch (error) {
      console.error('Error updating to-do:', error);
      res.status(400).json({ error: 'Server error' });
    }
  });
  
// DELETE a to-do item by ID
router.delete("/todos/:id", async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
  
      if (!todo) {
        return res.status(404).json({ error: 'To-do item not found' });
      }
  
      res.json({ message: 'To-do item deleted successfully' });
    } catch (error) {
      console.error('Error deleting to-do:', error);
      res.status(400).json({ error: 'Server error' });
    }
  });
  
module.exports = router;
