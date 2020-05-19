const express = require('express');

const router = express.Router();

const UserController = require('./controllers/UserController');

//html file
const index = '@/dist/index.html';

router.get('*', (req, res) => {
    res.sendFile(index);
})

module.exports = router;