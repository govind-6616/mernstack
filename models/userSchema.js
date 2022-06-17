const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    city: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    jobprofile: {
        type: String
    },
    gender:{
        type:String
    },
  
    Languages: {
        type: String,
    },
    Frameworks: {
        type: String,
    },
    Databases: {
        type: String,
    },
    projectLinks: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }
    ]
})
//Hashing password
//......here.....


userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, "mynameisgovindsinghandiamawebdeveloper")
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }
    catch (err) {
console.log(err);
    }

}

const User = new mongoose.model("USER", userSchema);
module.exports = User;