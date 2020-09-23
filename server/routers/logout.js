const router = require('express').Router()
const user = require('../models/models.users')
let jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const Access_Secret = process.env.ACCESS_SECRET
router.get('/logout', (req, res) => {
    try {
        const data = jwt.verify(req.cookies.ATC, Access_Secret)
        user.updateOne({ userId: data.id }, { token: "" }, (err, log) => {
            if (err) {
                const response = {
                    'error': true
                }
                res.send(response)
                console.log(err)
            }
            else {
                const response = {
                    'error': false
                }
                res.clearCookie('ATC').send(response)
                console.log('updated user collection')
            }
        })
    } catch (err) {
        const data = jwt.decode(req.cookies.ATC)
        const response = { 'error': true }
        res.clearCookie('ATC').send(response)
        console.log('jwt was changed')
    }
})
module.exports = router