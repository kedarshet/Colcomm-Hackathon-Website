const mongoose = require("mongoose")


var eventSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String},
},{timestamps:true})


const Event = mongoose.model("Event",eventSchema)


module.exports = Event;