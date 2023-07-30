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
    profilePic:{
        type:String,
        trim:true,
        default:"https://th.bing.com/th/id/R.a7ce18dec9affaf5ab51395ac967ae78?rik=KeA%2biXOYlZKFbg&riu=http%3a%2f%2fwww.agronomia.uanl.mx%2fwp-content%2fuploads%2f2016%2f11%2fno-avatar.png&ehk=Le2Uzebok%2bjRm66bAmlSxLPWb82km%2fNPwXQE4uvb5X0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
    }
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