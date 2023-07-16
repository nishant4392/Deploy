const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (data)=>{
    const token = jwt.sign({id:data},process.env.JWT_KEY,{ expiresIn: "30d" });
    return token;
}

module.exports = {generateToken};


