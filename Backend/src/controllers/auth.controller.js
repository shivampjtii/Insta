const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerController = async (req,res)=>{
    const {username, email, bio, password, profileImage } = req.body;
    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(401).json({
            message: "User already exists" + (isUserAlreadyExists.email==email)?"Email is already exists":"Username is already exists"
        })
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })
    const token = jwt.sign({id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d"}
    )
    res.cookie("token", token);
    return res.status(201).json({
        message: "User registered successfully",
        user:{
            username: user.username,
            email: user.eamil,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


const loginController = async(req, res)=>{
    const { username, email, password } = req.body;
    // const hash = await bcrypt.hash(password, 10);
    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password");
    if(!user){
        return res.status(401).json({
            message: "User not found"
        })
    }

    const pass = await bcrypt.compare(password, user.password);

    if(!pass){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d"}
    )
    res.cookie("token", token);
    return res.status(200).json({
        message: "User logged in successfully",
        user:{
            username: user.username,
            email: user.eamil,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
    
}

const getMeController = async(req, res)=>{
    const user = await userModel.findById(req.user.id);
    return res.status(200).json({
        message: "User fetched",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController
}