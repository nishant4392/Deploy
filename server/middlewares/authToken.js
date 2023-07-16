const jwt = require("jsonwebtoken");
const UsercollectionModel = require("../models/userModel");
require("dotenv").config();
const protect = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            let token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = await UsercollectionModel.findById(decoded.id);
            next();
        } catch (error) {
            return res.send({
                err:true,
                sysError:error
            })
        }
    } else {
        return res.send({
            err:true,
            msg:"No token found"
        })
    }
};



module.exports={protect};
