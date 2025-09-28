const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router()
const User = require('../models/User'); // adjust path based on file location


router.get('/',(req,res)=>{
  res.send("Check")
})

router.post('/signup',async(req,res)=>{
    console.log(req.body);
    res.send('hello')
    // const {phone_no}
})

router.post('/check-user', async (req, res) => {
  try {
    const { phone_no } = req.body;

    if (!phone_no) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const user = await User.findOne({ phone_no });

    if (user) {
      const userData = {
        phoneNumber: user.phone_no,
        name: user.name,
        age: user.age,
        grade: user.grade,
        createdAt: user.createdAt.toISOString(),
        level: user.level,
        exp: user.exp,
        stars: user.stars,
        badges: [], // You can replace with actual badge names if needed
        coins: user.coins,
        progress: {}, // Fill this if you track progress separately
        language: user.language || 'en' ,// optional field,
        lastUpdated : user.lastUpdated
      };

      return res.status(200).json({ exists: true, userData });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post('/create-user', async (req, res) => {
  try {
    const {
      phone_no,
      name,
      age,
      grade,
      language,
      createdAt,
      stars,
      coins,
      badges
    } = req.body;

    console.log("Creating user ",phone_no,
      name,
      age,
      grade,
      language,
      createdAt,
      stars,
      coins,
      badges)

    // Check if user already exists
    const existing = await User.findOne({ phone_no });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({
      phone_no,
      name,
      age,
      grade,
      language,
      createdAt,
      stars,
      coins,
      badges
    });

    await newUser.save();
    res.status(201).json({
      phoneNumber: newUser.phone_no,
      name: newUser.name,
      age: newUser.age,
      grade: newUser.grade,
      language: newUser.language,
      createdAt: newUser.createdAt,
      stars: newUser.stars,
      coins: newUser.coins,
      badges: [],
      progress: {}, // Optional for frontend use
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.post('/getUser', async (req, res) => {
  console.log(req.body)
  const { phone_no } = req.body;

  if (!phone_no) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    const user = await User.findOne({ phone_no });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ userData: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/update-user', async (req, res) => {
  console.log(req.body,"body of update")
  const { phone_no, ...rest } = req.body;

  if (!phone_no) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { phone_no },
      {
        $set: {
          ...rest,
          lastUpdated: new Date()
        }
      },
      { new: true } // return updated document
    );

    if (!updatedUser) {
      console.log("This Error")
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ userData: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





module.exports = router