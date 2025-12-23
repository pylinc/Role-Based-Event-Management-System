const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.signup = async(req,res)=>{
    try{

        const {name,email,password,role} = req.body;
    
        if(!name || !email || !password || !role){
            return res.status(422).json({
                success:false,
                message:"Fill all the Details",
            });
        }
        //check if user present
        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(400).json({
                success:false,
                message:"User Already Exist",
            });
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        
        //create an entry in database
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });

        return res.status(200).json({
            success:true,
            message:"Sign Up Successfull",
        });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong while SignUp",
        });
    }   
}

exports.login = async(req,res)=>{
    try{
        //fetch the data
        const {email , password} = req.body;
        // check all the details are filled
        if(!email || !password){
            return res.status(422).json({
                success:false,
                message:"Fill All the Details",
            });
        }
        //check if user exist 
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Does not Exist",
            });
        }
        //check for valid password
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(isPasswordMatch){
            const payload = {
                id:user._id,
                email:user.email,
                role:user.role,
            }
            //create token
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });     

            //insert token in the user
            user.token= token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"Logged In Successfully",
            });

        }else{
            return res.status(401).json({
                success:false,
                message:"Incorrect Password",
            });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something Went wrong while loggin In",
        });
    }
    
}