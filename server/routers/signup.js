const express = require('express');
const router = express.Router();
const user = require('../models/models.users')
const indexing = require('../models/models.indexing')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();
const Refresh_Secret = process.env.REFRESH_SECRET
const Access_Secret = process.env.ACCESS_SECRET
const createAccessToken = (id , key) => {
    const token = jwt.sign({
        id: id,
        iat:  Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (604800),
    }, key,  { algorithm: 'HS256' })
    return token
}

const createRefreshToken = (id,key) => {
    const token = jwt.sign({
        id:id,
        iat:  Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (604800),
    },key, {algorithm : "HS256"})
    return token
}

const addindex = (userdoc , userId , accesstoken, res) => {
    const addindexing = new indexing({
        UserDetailsId: userdoc._id,
        UserId : userId
    })
    addindexing.save((err , indexdoc)=>{
        if(err){
            const response = {
                "error" : true,
            }
            res.send(response)
            return
        } 
        console.log("saved to indexing collection"+"\n"+indexdoc)
        const response = {
            "error":false
        }
        res.cookie("ATC",accesstoken,{httpOnly:true}).send(response)
    })
}

const adddocument = (values,refreshtoken,accesstoken,res) => {
    var adduser = new user({
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        password: values.password,
        token: refreshtoken,
        userId: values.email,
        topicLists : []
    });
    adduser.save(function (err, userdoc) {
        if (err){
            const response = {
                "error" : true,
            }
            res.send(response)
            return
        };
        console.log("saved to user collection." + "\n" + userdoc);
        addindex(userdoc , values.email ,accesstoken,res)
    });
}
router.post('/signup', (req, res) => {
    user.find({ email: req.body.email }, (err, document) => {
        if (err){
            const response = {
                "error" : true,
            }
            res.send(response)
            return
        } 
        if (document.length > 0) {
            const response = {
                "error" : true,
                msg : 'user already Exists!!'
            }
            res.send(response)
            return
        }
        else if (document.length === 0) {
            const accesstoken = createAccessToken(req.body.email,Access_Secret)
            const refreshtoken = createRefreshToken(req.body.email,Refresh_Secret)
            adddocument(req.body,refreshtoken,accesstoken,res)
        }
    })
})
module.exports = router