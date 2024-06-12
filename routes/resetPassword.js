const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('resetPassword', {
        passwordsNotMatching: req.flash('passwordsNotMatching'),
        minLength: req.flash('minLength')
    });
});

//user presses Register button from login page, redirect to register page
router.post('/resetPassword', (req, res) => {
    if (req.body.repeatPassword !== req.body.password)
    {
        req.flash('passwordsNotMatching', 'Passwords do not match');
        console.log('passwords do not match');
        req.session.save(function() {
            res.redirect('/resetPassword');
        });
    }
    else if (req.body.password.length < 6)
    {
        req.flash('minLength', 'Password must have 6 characters minimum');
        console.log('must have 6 characters minimum');
        req.session.save(function() {
            res.redirect('/resetPassword');
        });
    }
    else
    {
        console.log('password resetted succesfsully');
        User.findOneAndUpdate({username:req.session.username}, {password:req.body.password}, (err, updated) => {
            if (err)
                console.log('error ', err);
            else
                res.redirect('/resetSuccess');
        })
    }
})

module.exports = router;
