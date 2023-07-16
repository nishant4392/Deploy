const bcrypt = require("bcrypt");

const verifyPassword = async(password,hash) => {   
   const verified = await bcrypt.compare(password,hash);
   return verified;
};

module.exports = {verifyPassword};