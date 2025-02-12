const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwt_secret = "thisIsSecret"

// Use POST for creating a user
router.post('/signup', [
  body('name',"enter name").notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], 
async (req, res) => {
  // chexk for errors
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  // find errors and create . user
  try {
  let user = await User.findOne({email: req.body.email})
  if(user){
    return res.status(500).json({error:"Please enter a unique email"})
  }

  // hashing password and adding salt
  const salt = await bcrypt.genSaltSync(10);
  const password = await bcrypt.hashSync("req.body.password", salt);

  const {name, email} = req.body;
  user = await User.create({
    name: req.body.name,
    email: req.body.email, 
    password: password
  })
  
  const data = {
    user: {
      id: user.id
    }
  }
  
  const authtoken = jwt.sign(data, jwt_secret)
  console.log(authtoken);
  
  res.json({authtoken})
  res.status(201).json(user)
} catch (err){
  console.log(err)
  res.status(500).send("Some error occured",err)
}

});

module.exports = router;




