const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDb = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://worm2:wgmpgdpwtm2@deploycluster.gakyxc3.mongodb.net/")
        console.log("connected to database");
    } catch (error) {
        console.log(error);   
    }
}
connectDb();

const userCollectionModel = require("./model/userModel");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",async (req,res)=>{
    let users = await userCollectionModel.find();
    res.send(users[0]);
})

app.listen(5000);

