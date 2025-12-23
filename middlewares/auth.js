const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async(req,res,next)=>{
    try{
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        //validate the token
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token in missing",
            });
        }
        //decode
        try{
            const decode =  jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        }catch(error){
            console.log(error);
            return res.status(400).json({
                success:false,
                message:"Invalid Token",
            });
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
        });
    }

}

exports.isStudent = async(req,res,next)=>{

    try{
        if(req.user.role!=='Student'){
            return res.status(402).json({
                success:false,
                message:"This is protected route of student",
            });
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        });
    }
}
exports.isOrganizer = async(req,res,next)=>{

    try{
        if(req.user.role!=='Organizer'){
            return res.status(402).json({
                success:false,
                message:"This is protected route of Organizer",
            });
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        });
    }
}
exports.isAdmin = async(req,res,next)=>{

    try{
        if(req.user.role!=='Admin'){
            return res.status(402).json({
                success:false,
                message:"This is protected route of Admin",
            });
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        });
    }
}

exports.isAdminOrOrganizer = async (req, res, next) => {

    try{
        const role = req.user.role;

        if(role === 'Admin' || role === 'Organizer'){
            return next();
        }

        return res.status(403).json({
            success:false,
            message:"This route is restricted to Admins or Organizers",
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        });
    }
}