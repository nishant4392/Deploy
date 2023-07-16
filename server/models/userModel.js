const mongoose= require("mongoose");
const bcrypt = require("bcrypt");

const userModel = mongoose.Schema({
    name:{
        type : String,
        trim : true ,
        required : true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    isVerified:{
      type:Boolean,
      default:false
    },
    otp:{
      type:String,
      default:null
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    userName:{
        type:String,
        trim:true,
        unique:true
    },
    privateBooks:[{
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          default: 1,
        },
        status: {
          type: String,
          enum: ["unread", "reading", "finished"],
          default: "unread",
        },
      }],
      publicBooks:[{
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          default: 1,
        },
        status: {
          type: String,
          enum: ["wishlist", "reading", "finished","dropped"],
          default: "wishlist",
        },
      }]
});


userModel.pre("save",async function(next){
  if(!this.isModified("password")){
    next()
}
else{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
}
})

const User = mongoose.model("User",userModel);

module.exports = User;