const router = require('express').Router()
const feedtopic = require('../../models/models.feed')
const user = require('../../models/models.users')
const dotenv = require("dotenv");
let jwt = require('jsonwebtoken');
dotenv.config();
const Access_Secret = process.env.ACCESS_SECRET

const save_redis = values => {
    console.log(client)
}

const createAccessToken = (id , key) => {
    const token = jwt.sign({
        id: id,
        iat:  Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (900),
    }, key,  { algorithm: 'HS256' })
    return token
}
const addusertopic = (values , res,flag ,accesstoken) => {
    user.updateOne({userId : values.UserId} , {$push : {'topicLists' : {
        heading : values.heading,
        description : values.description,
        userId : values.UserId,
        admin : values.CreatedBy,
        members : values.Members,
        viewers : values.Viewers,
        category : values.category,
        hashtags : values.HashTag
    }}} , (err,doc)=>{
        if(err){
            res.send({'error' : true})
            console.log(err)
            return
        }
        console.log(doc + "\n" + "updated user collection")
        if(flag == 0){
            res.send({'error':false})
            save_redis(values)
        }
        else{
            res.cookie("ATC",accesstoken,{httpOnly:true}).send({'error' : false})
            save_redis(values)
        }
    })
}

const addtopic = (values,res,flag , accesstoken) => {
    const newfeedtopic = new feedtopic({
        heading: values.heading,
        description: values.description,
        UserId: values.userId,
        CreatedBy: values.CreatedBy,
        Members: values.Members,
        Viewers:values.Viewers,
        HashTag: values.HashTag,
        rating:values.rating,
        engagementRate : values.engagementRate,
        category:'no category'
    })
    newfeedtopic.save(function (err, topicdoc) {
        if (err){
            console.log(err)
            res.send({'error' : true})
            return
        } 
        console.log("saved to feedtopic collection.");
        console.log(topicdoc)
        addusertopic(topicdoc , res, flag , accesstoken)
    });
}

router.post('/home/createtopic', (req, res) => {
    try{
        const decode = jwt.verify(req.cookies.ATC , Access_Secret)
        user.find({ userId: decode.id }, (err, document) => {
            if (err){
                console.log(err)
                res.send({'error' : true})
                return
            }
            else if (document.length !== 0) {
                const data = {
                    heading:req.body.ContentHeading,
                    CreatedBy:document[0].firstName + " " + document[0].lastName,
                    description:req.body.ContentDescription,
                    userId:document[0].userId,
                    Members:1,
                    Viewers:1,
                    rating:20,
                    engagementRate:0,
                    HashTag:"#rand1 #rand2 #rand3"
                }
                addtopic(data , res, 0 , "")
            }
        })
    }catch(err){
        const data = jwt.decode(req.cookies.ATC)
        const accesstoken = createAccessToken(data.id,Access_Secret)
        user.find({ userId: data.id }, (err, document) => {
            if (err){
                console.log(err)
                res.send({'error' : true})
                return
            }
            else if (document.length !== 0) {
                const data = {
                    heading:req.body.ContentHeading,
                    CreatedBy:document[0].firstName + " " + document[0].lastName,
                    description:req.body.ContentDescription,
                    userId:document[0].userId,
                    Members:1,
                    Viewers:1,
                    rating:20,
                    engagementRate:0,
                    HashTag:"#rand1 #rand2 #rand3"
                }
                addtopic(data , res,1,accesstoken)
            }
        })
    }
})

module.exports = router;