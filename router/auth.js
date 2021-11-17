const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const express = require('express');
const { json, urlencoded, Router } = require("express");
const route = express.Router();
route.use(express.json());
route.use(urlencoded({ extended: true }));
require("../db/conn");
const User = require('../models/userSchema');
const Authenticate=require("../middleware/Authenticate.js");

// const createToken=async ()=>{
//    const token=await jwt.sign({unique_key:"254887455484"},"qwerftyuhbgekjuuyrbhfjiurnspoundgr",{
//        expiresIn:"5 seconds"
//    });
   
// console.log(token);
// const userVar=await jwt.verify(token,"qwerftyuhbgekjuuyrbhfjiurnspoundgr");
// console.log(userVar);
// }

// createToken();

route.post("/register",(req, res) => {
    const { username,name,email, password, cpassword, city, mobile, qualification,
        jobprofile,gender,Languages,Frameworks,Databases,projectLinks} = req.body;
    if (!username || !name || !email || !password || !cpassword || !mobile || !city || !qualification) {
        return res.status(402).json({ error: "please fill the form properly" });
    }
    User.findOne({ username: username })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ message: "User already exist" });
            }
          else if(password !==cpassword){
                return res.status(401).json({ message: "password not match" });
            }
        let hpassword=bcrypt.hashSync(password,bcrypt.genSaltSync());
        // console.log(hpassword);
            const user = new User({username,name,email, password:hpassword,city, mobile, qualification,
                jobprofile,gender,Languages,Frameworks,Databases,projectLinks });

            user.save().then(() => {
                console.log('success in registeration');
                return res.status(200).json({ message: "Successful registered" });
            }).catch((err) => {
                console.log('failed in Registeration');
                return res.status(500).json({ error: "failed in registeration" });
            })
        }).catch((err) => {
            console.log(err);
        })
})
route.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ err: "please fill fields" });
        }
        const userLogin = await User.findOne({ username: username });
    
        if(userLogin){
            const isMatch=bcrypt.compareSync(password,userLogin.password);
            // console.log(userLogin.password);

            const token=await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+86400000),
                httpOnly:true
            });
        
        if(!isMatch){
            return res.status(400).json({ err: "invalid password" });
        }
        else{
            return res.status(200).json({ message: "successfully login" });
        }
       
    }
    else{
        return res.status(400).json({ err: "invalid credentials" });
    }
}
    catch (err) {
        console.log(err);
    }
})
route.get("/about",Authenticate ,(req,res)=>{
    console.log("Hello from about Page Router");
res.send(req.rootUser);

route.get('/contactData',Authenticate,(req,res)=>{
    console.log("hello from contact page router");
    res.send(req.rootUser);
})

route.get('/getData',Authenticate,(req,res)=>{
    res.send(req.rootUser);
})
route.get('/logout',Authenticate,async(req,res)=>{
    try{

        req.rootUser.tokens=req.rootUser.tokens.filter((currentElm)=>{
            return currentElm.token!==req.token;
    });
        res.clearCookie("jwtoken",{path:'/login'});
console.log("user Logout");
await req.rootUser.save();
res.status(200).send('User Logout');

    }catch(err){
        console.log(err);
    }
})
});

module.exports = route;