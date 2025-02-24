const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser.js')

const jwt_secret = "anshu";

// Use POST for creating a user
router.post('/signup', [
  body('name', "enter name").notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
],
  async (req, res) => {
    let success = false 
    // chexk for errors
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    // find errors and create . user
    try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(500).json({ error: "Please enter a unique email" })
      }
      
      // hashing password and adding salt
      const salt = await bcrypt.genSaltSync(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const { name, email } = req.body;
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: password
      })

      const data = {
        id: user._id
      }
      console.log(user, data.user);
      

      const authtoken = jwt.sign(data, jwt_secret)
      console.log(authtoken);

      success = true 
      res.json({ 
        success,
        authtoken: authtoken,
        password: user.password,
        email: user.email,
      })

    } catch (err) {
      console.log(err)
      res.status(500).json({success, perrorr: "invalid credentials "})
    }

  });


// login 
router.post(
  '/login',
  [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password is required").exists()
  ],
  async (req, res) => {
    let success = false
    // **Check for validation errors**
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // **Check if user exists**
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // **Compare password**
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // **Generate JWT token**
      const data = { id: user._id};
      const authtoken = jwt.sign(data, jwt_secret, { expiresIn: '1h' });
      success = true 
      res.json({ success, authtoken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success, error: "Some error occurred" });
    }
  }
);


// get user data

router.post('/getuser', fetchuser, async (req, res)=>{
  try {
    const userId = req.id
    console.log("req.id->", req.id);
    console.log("userid -> ", userId);
    
    const user = await User.findById(userId).select("-password")
    console.log("user -> ", user);
    
    res.send(user)
    
  } catch (err) {
    
    res.status(500).json({error: 'Server error'})
  }

})


module.exports = router;

