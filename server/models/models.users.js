const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
        firstName: { type: String, required: true}, 
        lastName: { type: String, required: true},
        email: {type: String, required: true},
        password: { type: String, required: true},
        token:{ type:String, required:false},
        userId:{type:String, required:true},
        topicLists: [{
            admin : String,
            heading : String,
            description : String,
            userId: String,
            members : String,
            viewers: String,
            category : String,
            hashtags : String,
        }]
    },
    { timestamps: true}
)

const user = mongoose.model('users' , userSchema)

module.exports = user