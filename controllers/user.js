const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const user = require('../models/user');
const saltRounds = 10;

async function register(req, res, next) {
    try {
    console.log(req.body);
    const {username, email, password} = req.body;
    const usernameUniqueCheck = await User.findOne({username})   
    if (usernameUniqueCheck) {
        return res.json({msg: "username already in use", status: false});

    }
    const emailUniqueCheck = await User.findOne({email})
    if (emailUniqueCheck) {
        return res.json({msg: "email already in use", status: false})
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    });
    delete user.password;
    return res.status(201).json({status: true, user}) 

    } catch(err) {
        next(err);
    }; 
    
};

async function login(req, res, next) {
    try {
    // console.log(req.body);
    const {username, password} = req.body;
    const userQuery = await User.findOne({username})
    
    if (!userQuery) {
        return res.json({msg: "user does not exist", status: false})

    }

    const authed = await bcrypt.compare(password, userQuery.password)
    // console.log(authed, userQuery);

    if (authed) {
        let user = userQuery.toObject()
        delete user.password;
        return res.status(200).json({msg: "user found", status: true, user})
    } else {
        return res.json({msg: "incorrect password for this user", status: false})
    }
        
    } catch(err) {
        next(err);
    }
    
}

function hello(req, res, next) {
    res.status(200).send('register route')

} 


module.exports = {register, hello, login}