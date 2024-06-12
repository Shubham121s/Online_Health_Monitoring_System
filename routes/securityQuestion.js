const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('securityQuestion', {
        IncorrectAnswer: req.flash('IncorrectAnswer'),
        SecurityQuestion: req.session.securityQuestion
    });
});

//user presses Register button from login page, redirect to register page
router.post('/securityQuestion', (req, res) => {
    User.findOne({username: req.session.username}, (err,user) => {
        if (user.securityAnswer !== req.body.securityAnswer) {
            req.flash('IncorrectAnswer', "Oops! That wasn't correct. Try again.");
            req.session.save(function() {
                res.redirect('/securityQuestion');
            });
        }   
        else {
            console.log('successs');
            res.redirect('/resetPassword');
        }
    });
})

module.exports = router;
