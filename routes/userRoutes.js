const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user')

router.post('/register', userControllers.register)

router.post('/login', userControllers.login)

router.get('/contacts/:id', userControllers.authenticateToken, userControllers.allUsers)

// /contact:id/update
router.put('/avatar/:id', userControllers.authenticateToken, userControllers.update)

// /contact:id/delete
router.delete('contact/:id/delete', userControllers.authenticateToken, userControllers.deleteUser)

router.get('/', userControllers.authenticateToken, userControllers.hello)
module.exports = router;