const router = require('express').Router()
let user = require('../models/models.users')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();
const Refresh_Secret = process.env.REFRESH_SECRET
const Access_Secret = process.env.ACCESS_SECRET
const createAccessToken = (id, key) => {
    const token = jwt.sign({
        id: id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (900),
    }, key, { algorithm: 'HS256' })
    return token
}

const createRefreshToken = (id, key) => {
    const token = jwt.sign({
        id: id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (604800),
    }, key, { algorithm: "HS256" })
    return token
}

router.post('/login', (req, res) => {
    user.find({ email: req.body.loginemail, password: req.body.loginpassword }, (err, document) => {
        if (err) {
            const response = {
                'error': true
            }
            console.log(err)
            res.send(response)
        }
        else {
            if (document.length === 0) {
                const response = {
                    'error': true,
                    'user': 'invalid email/password'
                }
                res.send(response)
            }
            else {
                const accesstoken = createAccessToken(document[0].userId, Access_Secret)
                const refreshtoken = createRefreshToken(document[0].userId, Refresh_Secret)
                user.updateOne({ userId: document[0].userId }, { token: refreshtoken }, (err, document) => {
                    if (err) {
                        const response = {
                            'error': true
                        }
                        console.log(err)
                        res.send(response)
                    }
                    else {
                        const response = {
                            'succ': true
                        }
                        res.cookie("ATC",accesstoken,{httpOnly:true}).send(response)
                    }
                })
            }
        }
    })
})

module.exports = router