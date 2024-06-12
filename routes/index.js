const express = require('express');
const router = express.Router();
const path = require("path") 
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('index', {invalidLogin: req.flash('invalidLogin')});
});

//user presses Register button from login page, redirect to register page
// router.post('/index', (req, res) => {
//     if (User.findOne({username: req.body.username, password:req.body.password}).then(err,user => {
//         if(err) {   //server error cannot fufill request
//             console.log(err);
//             return res.status(500).send();
//         }
//         if (!user)  //invalid user/password entered
//         {
//             console.log('404');
//             req.flash('invalidLogin', 'Invalid Username or Password. Try again or Reset your Password');
//             req.session.save(function() {
//                 return res.redirect('/index');
//             }); 
//         } 
//         else
//         {
//             //store the user in the session redirect to tables
//             console.log('successfully logged in');
//             req.session.user = user;
//             req.session.save(function() {
//                 return res.redirect('/tables');
//             });
//         }
//     }));
// })

router.post('/index', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (!user) {
            console.log('Invalid Username or Password');
            req.flash('invalidLogin', 'Invalid Username or Password. Try again or Reset your Password');
            return res.redirect('/index');
        }

        console.log('Successfully logged in');
        req.session.user = user;
        await req.session.save(); // You can use await directly with req.session.save()

        return res.redirect('/tables');
    } catch (err) {
        console.error(err);
        return res.status(500).send(); // Server error
    }
});

//user presses Register button from login page, redirect to register page
router.post('/RegisterRedirect', (req, res) => {
    res.redirect('/Register') 
})

module.exports = router;
