const mongoose=require('mongoose');
const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');

// DB connection
require("./db/conn.js");
app.use(cookieParser());
//Router 
app.use(require('./router/auth'));
// app.use(express.json);

//Document Schema
const User=require("./models/userSchema");

// Middleware
const middleware=(req,res,next)=>{
    console.log("hi I am Middle ware");
    next();
}

if(process.env.NODE_ENV="production"){
app.use(express.static("frontend/build"));
const path=require('path');
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"client","build","index.html"));
})
}

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server running at port number ${port}`);
    // M0ngoDBAtl@$
    // username:govind
    // password:govind
})