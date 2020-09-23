const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blacklistSchema = new Schema({
    token : {type:String,required:true},
    userId : {type:String,required:true}},
    {timestamps : true}
)

const blacklist = mongoose.model('blacklist' , )
