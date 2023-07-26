const express = require("express");
const cors = require("cors");

const {connectDb} = require("./config/connectDb");
const UserRoutes  = require("./routes/userRoutes");
const bookRoutes  = require("./routes/bookRoutes");


require("dotenv").config();
connectDb();



const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("The app is listening to port 5000");
});

app.use("/api/user",UserRoutes);
app.use("/api/book",bookRoutes)
app.listen(5000);
