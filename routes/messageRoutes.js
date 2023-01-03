const express = require('express');
const router = express.Router();
const messageControllers = require('../controllers/message')

router.post('/addmsg', messageControllers.addMessages)

router.post('/getmsg', messageControllers.allMessages)

module.exports = router;
