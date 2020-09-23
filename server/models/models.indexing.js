const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IndexingSchema = new Schema({
    UserDetailsId: {type:String,required:true},
    UserId:{type:String,required:true}},
    { timestamps: true }
)

const indexing = mongoose.model('indexing' , IndexingSchema)

module.exports = indexing