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

module.exports = router;