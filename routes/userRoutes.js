const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user')

router.post('/', userControllers.register)

router.get('/', userControllers.hello)
module.exports = router