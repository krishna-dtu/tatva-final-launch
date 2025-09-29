const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router()
const User = require('../models/User');
const Subject = require('../models/Subjects'); 
const subjectUser = require('../models/subjectUser')
const question = require("../models/Question");
const Question = require('../models/Question');
const DailyStats = require('../models/DailyStats')

 
const getDailyStats = async(phoneNo) => {
  try {
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    let stats = await DailyStats.findOne({ phoneNo });

    if (!stats) {
      // User not found, return default values
      return {
        solved: 0,
        streak: 1
      };
    }

    const lastUpdate = new Date(stats.updated);
    const lastUpdateDateOnly = new Date(lastUpdate.getFullYear(), lastUpdate.getMonth(), lastUpdate.getDate());

    const diffInDays = Math.floor((todayDateOnly - lastUpdateDateOnly) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      // Same day
      return {
        solved: stats.solved,
        streak: stats.streak
      };
    } else {
      // Not today
      let newStreak = stats.streak;

      if (diffInDays === 1) {
        // Keep current streak
        newStreak = stats.streak;
      } else {
        // Missed more than 1 day → reset streak to 1
        newStreak = 1;
      }

      return {
        solved: 0,
        streak: newStreak
      };
    }
  } catch (error) {
    console.error('Error getting daily stats:', error);
    throw error;
  }
}

router.post("/daily_info" , async(req,res)=>{
  const {phone_no} = req.body;
  ans = await getDailyStats(phone_no);
  console.log(ans , "ans")
  res.send(ans)
})

const updateDailyStats = async(phoneNo)=> {
  try {
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    let stats = await DailyStats.findOne({ phoneNo });

    if (!stats) {
      // If user doesn't exist, create new entry
      stats = new DailyStats({
        phoneNo,
        solved: 1,
        streak: 1,
        updated: today
      });
      await stats.save();
      console.log('New stats created.');
      return;
    }

    const lastUpdate = new Date(stats.updated);
    const lastUpdateDateOnly = new Date(lastUpdate.getFullYear(), lastUpdate.getMonth(), lastUpdate.getDate());

    const diffInDays = Math.floor((todayDateOnly - lastUpdateDateOnly) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      // Same day
      stats.solved += 1;
      // streak remains the same
    } else if (diffInDays === 1) {
      // Next day
      stats.streak += 1;
      stats.solved = 1;
    } else {
      // Missed at least 1 day
      stats.streak = 0;
      stats.solved = 1;
    }

    stats.updated = Date.now();
    await stats.save();
    console.log('Stats updated successfully.');
  } catch (error) {
    console.error('Error updating daily stats:', error);
  }
}

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

router.post("/getQuestion", async (req, res) => {
  try {
    console.log("Check", req.body);

    let user = await subjectUser.findOne({ subject: req.body.subjectId, phone: req.body.phone_no });

    if (!user) {
      user = new subjectUser({
        phone: req.body.phone_no,
        subject: req.body.subjectId,
        lastUpdated: Date.now(),
      });

      await user.save();
    }

    const size = user.solved;

    let ans = await Question.find({ subjectId: req.body.subjectId });
    let n_user = await subjectUser.find({ subject: req.body.subjectId, phone: req.body.phone_no });
    if(n_user.length > 1){
      let res = subjectUser.findByIdAndDelete(n_user[0]._id)
    }

    console.log("Question", ans, req.body.phone_no);

    res.json({
      size,
      question: ans,
      ans: user.answers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/completed', async (req, res) => {
  try {
    const { phone_no, subjectId } = req.body;
    console.log(req.body);

    if (!phone_no || !subjectId) {
      return res.status(400).json({ message: 'phone and subject are required' });
    }

    const updatedUser = await subjectUser.findOneAndUpdate(
      { phone: phone_no, subject: subjectId }, // Use correct field names
      { 
        chapterCompleted: true,
        lastUpdated: Date.now()
      },
      { new: true, upsert: true } // Upsert to create if not found
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found for given phone and subject' });
    }

    return res.json({ message: 'Chapter marked as completed', user: updatedUser });
  } catch (err) {
    console.error("Error in /completed:", err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});


  router.post("/updateuser", async (req, res) => {
  const { subjectId, phone_no } = req.body;

  try {
    // Update SubjectUser collection
    updateDailyStats(phone_no);
    const updatedDoc = await subjectUser.findOneAndUpdate(
      {
        subject: subjectId,
        phone: phone_no,
      },
      {
        $inc: {
          solved: 1,
        },
        $set: {
          lastUpdated: new Date(),
        },
      },
      {
        new: true,     // return the updated document
        upsert: true,  // create if not exists
      }
    );

    // Update User collection
    const updateUser = await User.findOneAndUpdate(
      { phone_no },
      {
        $inc: {
          exp: 5,
          stars: 10,
          coins: 20,
        },
        $set: {
          lastUpdated: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    if (!updatedDoc || !updateUser) {
      return res.status(404).json({ message: 'User or SubjectUser not found' });
    }

    res.status(200).json({
      message: 'Answers updated successfully',
      subjectUser: updatedDoc,
      user: updateUser,
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



  router.post("/getData",async(req,res)=>{
    const {phone_no} = req.body;
    let userData = await User.findOne({phone_no})
    userData.missions = 0,
    dailymission = [0,0,0],
    weeklymission = [0,0]
  })

  router.post('/progress',async(req,res)=>{
    const {phone_no} = req.body;
    console.log(phone_no)
    let resp = await subjectUser.find({phone : phone_no})
    const result = {};

    resp.forEach(item => {
      if (item.subject !== undefined && item.solved !== undefined) {
        result[item.subject] = item.solved;
      }
    })
    res.send(result)
  })






module.exports = router