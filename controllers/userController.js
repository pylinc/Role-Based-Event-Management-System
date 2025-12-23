const Event = require('../model/Event');
const Registration = require('../model/Registration');


exports.eventRegistration = async (req,res)=>{
    try{

        const eventId = req.params.id;
        const userId = req.user._id;

        if(!userId || !eventId){
            return res.status(400).json({
                success:false,
                message:"Enter all the details",
            });
        }
        const eventExist = await Event.findById(eventId);

        if(!eventExist){
            return res.status(404).json({
                success:false,
                message:"Event does not exist",
            });
        }
        const alreadyRegister = await Registration.findOne({userId,eventId});

        if(alreadyRegister){
            return res.status(409).json({
                success:false,
                message:"User already Register",
            });
        }

        const eventRegister = await Registration.create({eventId:eventId,userId:userId});

        return res.status(200).json({
            success:true,
            message:"Event Registration Successfull",

        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error While Registering for event",
        });
    }
}