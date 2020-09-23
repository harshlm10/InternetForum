const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedSchema = new Schema({
    heading: { type: String, required: true },
    CreatedBy: { type: String, required: true },
    description: { type: String },
    UserId: { type: String, required: true },
    Members: { type: Number, required: true },
    Viewers: { type: Number, required: true },
    HashTag: { type: String },
    rating:{type:Number},
    category:{type:String , required:true},
    engagementRate : {type:String}
},
    { timestamps: true }
)

const feedtopic = mongoose.model('feed' , FeedSchema)

module.exports = feedtopic