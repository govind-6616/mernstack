const jwt=require('jsonwebtoken');

const User=require('../models/userSchema');
const Authenticate=async (req,res,next)=>{
    try{
const token=req.cookies.jwtoken;
const verifyToken=jwt.verify(token,"mynameisgovindsinghandiamawebdeveloper");
const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
if(!rootUser){
    throw new Error('user not found');
}
req.token=token;
req.rootUser=rootUser;
req.userId=rootUser._id;

next();
    }
    catch(err){
        res.status(401).send("not authorise");
        console.log(err);
    }

}
module.exports=Authenticate;