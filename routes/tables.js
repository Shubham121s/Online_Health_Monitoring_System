const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user');

// Route to serve tables.html
router.get('/', (req, res) => {
    const user = req.session.user;

    if (!user) { // Check if user is not logged in
        return res.redirect('/index');
    }

    res.sendFile(path.join(__dirname, '/../tables.html'));
});

// Logout route
router.post('/Logout', (req, res) => {
    req.session.destroy(err => { // Destroying the session with a callback to handle potential errors
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/index');
    });
});

// Report route
router.post('/Report', (req, res) => {
    req.session.save(() => {
        res.redirect('/report');
    });
});

// Input route
router.post('/Input', async (req, res) => {
    let newUserData = req.session.user.userData || {
        date: [],
        activity: [],
        weight: [],
        minutes: [],
        caloriesIn: [],
        caloriesOut: []
    };

    // Ensure all fields are initialized as arrays
    newUserData.date = newUserData.date || [];
    newUserData.activity = newUserData.activity || [];
    newUserData.weight = newUserData.weight || [];
    newUserData.minutes = newUserData.minutes || [];
    newUserData.caloriesIn = newUserData.caloriesIn || [];
    newUserData.caloriesOut = newUserData.caloriesOut || [];

    const enteredDate = Date.parse(req.body.Date);

    if (newUserData.date.length === 0) {
        // Insert data directly if newUserData is empty
        newUserData.date.push(req.body.Date);
        newUserData.activity.push(req.body.Activity);
        newUserData.weight.push(req.body.Weight);
        newUserData.minutes.push(req.body.Minutes);
        newUserData.caloriesIn.push(req.body.CaloriesIn);
        newUserData.caloriesOut.push(req.body.CaloriesOut);
    } else {
        let inserted = false;
        // Insert data in sorted order based on date
        for (let i = 0; i < newUserData.date.length; i++) {
            const existingDate = Date.parse(newUserData.date[i]);
            if (existingDate >= enteredDate) {
                newUserData.date.splice(i, 0, req.body.Date);
                newUserData.activity.splice(i, 0, req.body.Activity);
                newUserData.weight.splice(i, 0, req.body.Weight);
                newUserData.minutes.splice(i, 0, req.body.Minutes);
                newUserData.caloriesIn.splice(i, 0, req.body.CaloriesIn);
                newUserData.caloriesOut.splice(i, 0, req.body.CaloriesOut);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            // Insert at the end if the entered date is the latest
            newUserData.date.push(req.body.Date);
            newUserData.activity.push(req.body.Activity);
            newUserData.weight.push(req.body.Weight);
            newUserData.minutes.push(req.body.Minutes);
            newUserData.caloriesIn.push(req.body.CaloriesIn);
            newUserData.caloriesOut.push(req.body.CaloriesOut);
        }
    }

    try {
        await User.findByIdAndUpdate(req.session.user._id, { userData: newUserData }, { new: true });
        console.log('Successfully updated user data');
        res.redirect('/tables');
    } catch (err) {
        console.error('Error updating user data:', err);
        res.redirect('/tables');
    }
});

// Update route
router.post('/Update', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.session.user._id, { userData: req.body.userData }, { new: true });
        console.log('Successfully updated user data');
        res.redirect('/tables');
    } catch (err) {
        console.error('Error updating user data:', err);
        res.redirect('/tables');
    }
});

module.exports = router;



