// app.js
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cookieParser=require("cookie-parser");
const path = require("path");


const app = express();
app.use(cookieParser());
const port = process.env.PORT || 4500;

const adminRouter = require("./Routes/AdminRoutes");
// Connect to MongoDB
require("./config/database").connect();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
  res.redirect('/admin');
});

//routes
app.use("/admin", adminRouter);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
