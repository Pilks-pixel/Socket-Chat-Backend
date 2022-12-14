const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user')

router.post('/register', userControllers.register)

router.post('/login', userControllers.login)

router.get('/', userControllers.authenticateToken, userControllers.hello)
module.exports = router