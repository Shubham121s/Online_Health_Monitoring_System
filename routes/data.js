const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let output = req.session.user;
    res.send(output);
});

module.exports = router;
