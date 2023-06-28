const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    rollNo:Number,
    descriptiom:String
})

module.exports = mongoose.model("allUsers",userSchema);
