const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('resetSuccess');
});

//user presses Register button from login page, redirect to register page
router.post('/resetSuccess', (req, res) => {
    res.redirect('/index');
})

module.exports = router;
