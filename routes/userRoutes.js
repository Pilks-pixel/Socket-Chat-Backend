const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user')

router.post('/register', userControllers.register)

router.post('/login', userControllers.login)

router.put('/avatar/:id', userControllers.authenticateToken, userControllers.update)

router.get('/contacts/:id', userControllers.authenticateToken, userControllers.allUsers)

router.get('/', userControllers.authenticateToken, userControllers.hello)
module.exports = router;