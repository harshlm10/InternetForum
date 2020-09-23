const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
const client = require('../Initialization/Intialization')
dotenv.config();
const Access_Secret = process.env.ACCESS_SECRET
const user = require('../models/models.users')
router.get('/', (req, res) => {
    console.log(client)
    if (req.cookies.ATC) {
        try {
            jwt.verify(req.cookies.ATC, Access_Secret)
            res.send({'user':'authenticated'}) 
        }catch(err){
            const token = jwt.decode(req.cookies.ATC)
            console.log(token)
            res.send({ 'user': 'invalid' })
        }
        return
    }
    else {
        res.send({ 'user': 'invalid' })
    }
})

module.exports = router