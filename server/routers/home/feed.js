const router = require('express').Router()
const feedtopic = require('../../models/models.feed')
let jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const Access_Secret = process.env.ACCESS_SECRET

const createAccessToken = (id , key) => {
    const token = jwt.sign({
        id: id,
        iat:  Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (900),
    }, key,  { algorithm: 'HS256' })
    return token
}

const verifyuser = (accesstoken,res) => {
    try{
        jwt.verify(accesstoken , Access_Secret)
        feedtopic.find({},(err,document)=>{
            if(err){
                res.send({'error': true})
                console.log('error')
                return
            } 
            if(document.length === 0){
                res.send({  'count' : 0,
                            'topics':[],
                            'error' : false})
                return
            }
            const values = {
                'count' : document.length,
                'topics' : document,
                'error' : false
            }
            res.status(200).send(values)
        })
    }catch(err){
        const data = jwt.decode(accesstoken)
        const accesstoken = createAccessToken(data.id,Access_Secret)
        feedtopic.find({},(err,document)=>{
            if(err){
                res.send({'error': true})
                console.log('error')
                return
            } 
            if(document.length === 0){
                res.cookie("ATC",accesstoken,{httpOnly:true}).send({  'count' : 0,
                            'topics':[],
                            'error' : false})
                return
            }
            const values = {
                'count' : document.length,
                'topics' : document,
                'error' : false
            }
            res.cookie("ATC",accesstoken,{httpOnly:true}).send(values)
        })
    }
}
router.get('/home/feed',(req,res)=>{
    verifyuser(req.cookies.ATC , res)
})

module.exports = router