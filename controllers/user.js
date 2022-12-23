const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { findOneAndUpdate } = require('../models/user');
const saltRounds = 10;

async function register(req, res, next) {
    try {
    // console.log(req.body);
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

    const payload = { username: user.username, email: user.email }

    const accessToken = jwt.sign(payload, process.env.SECRET_KEY);
    // console.log(user, accessToken)
    return res.status(201).json({accessToken: accessToken, msg: "user created", status: true, user})

    // return res.status(201).json({status: true, user}) 

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
        const payload = { username: user.username, email: user.email }

        const accessToken = jwt.sign(payload, process.env.SECRET_KEY);
        return res.status(200).json({accessToken: accessToken, msg: "user found", status: true, user})
        // return res.status(200).json({msg: "user found", status: true, user})
    } else {
        return res.json({msg: "incorrect password for this user", status: false})
    }
        
    } catch(err) {
        next(err);
    }
    
}

async function update(req, res, next) {
    try {
        console.log(req.body)
        const {avatar, id} = req.body
        const setAvatarImage = await User.findOneAndUpdate({_id : id},{avatarImage : avatar, isAvatarImageSet : true})
        const user = setAvatarImage.toObject();
        return res.status(200).json({msg: "user updated", status: true, user})

    } catch (err) {
        next(err)
    }
}

async function hello(req, res, next) {
    try {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        const user = req.user
        res.status(200).json(user);

    } catch(err) {
        res.status(500).send({ err });
    }

} 

function authenticateToken(req, res, next) {
    console.log(req.headers)
    const header = req.headers['authorization'];
    if (header) {
        const token = header.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
            if(err){
                res.status(403).json({ err: 'Invalid token' })
            } else {
                // if token valid, continue to the route handler 
                req.user = data;
                next();
            }
        })
    } else {
        res.status(403).json({ err: 'Missing token' })
    }
}


module.exports = {register, hello, login, authenticateToken, update}