const express = require('express');
const User = require('../models/User.js');
const router = express.Router();

router.use(express.json())
// Use POST for creating a user
router.post('/', async (req, res) => {
  
  const user = new User({
    "name":"anshu",
    "email": "anshu@gmail.com",
    "password": "084245"
  });
  await user.save();
  res.status(201).json({
    message: "user created successfully"
  })
  
});

module.exports = router;