const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router()
const User = require('../models/User');
const Subject = require('../models/Subjects'); 
const subjectUser = require('../models/subjectUser')
const question = require("../models/Question");
const Question = require('../models/Question');


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

router.post("/getQuestion",async(req,res)=>{
    console.log("Check",res.body)
    let user = await subjectUser.find({subjectId : req.body.subjectId , phone : req.body.phone_no});
    if (user){
      user = new subjectUser({
      phone : req.body.phone_no,
      subject : req.body.subjectId,
      lastUpdated: Date.now()
    });
    await user.save()  
    size = user.answers.length 
  
    }
    try{
    let ans = await Question.find({subjectId : req.body.subjectId});
    console.log("Question" ,ans , req.body.phone_no)
    res.json({"size" : size , "question" : ans , "ans" : user.answers});
    }
    catch(err){
      console.log(err)
      res.send(err)
    }
  })

  router.post("/updateuser",async(req,res)=>{
    const {subjectId,phone_no,new_ans} = req.body;
    try {
    const updatedDoc = await subjectUser.findOneAndUpdate(
      {
        subject: subjectId,
        phone: phone_no
      },
      {
        answers: new_ans,
        lastUpdated: Date.now()
      },
      {
        new: true,       // return the updated document
        upsert: true    
      }
    );

    const updateUser = await User.findOneAndUpdate({phone_no},{
        $inc: {
          exp: 5,
          stars: 10,
          coins : 20
        },
        $set: {
      lastUpdated: Date.now() // <-- Fix here: call the function
    }
      },
      {
        new: true
      }
    )

    if (!updatedDoc) {
      return res.status(404).json({ message: 'SubjectUser not found' });
    }

    res.status(200).json({
      message: 'Answers updated successfully',
      data: updatedDoc
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
    
  })


  router.post("/getData",async(req,res)=>{
    const {phone_no} = req.body;
    let userData = await User.findOne({phone_no})
    userData.missions = 0,
    dailymission = [0,0,0],
    weeklymission = [0,0]
  })






module.exports = router