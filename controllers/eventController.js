const Event = require('../model/Event');
const User = require('../model/User');

exports.createEvent = async(req,res)=>{
    try{
        const {title,description} = req.body;

        if(!title || !description){
            return res.status(400).json({
                success:false,
                message:"Fill all the Details",
            });
        }

        if(req.user.role === "Organizer" || req.user.role ==="Admin"){

            const event = await Event.create({
                title,
                description,
                createdBy:req.user.id || req.user._id, // JWT payload uses 'id', fallback to '_id'
            });

            return res.status(200).json({
                success:true,
                message:"Event Created Successfully",
            });

        }else{
            return res.status(403).json({
                success:false,
                message:"Event Creation Not allowed for you",
            });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong While Creating Event.",
        });
    }
}

exports.viewAllEvent = async(req,res)=>{

    try{
        const events = await Event.find({},"title description date");

        res.status(200).json({
            success:true,
            message:events,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"No Events Found",
        });
    }
}

exports.viewSingleEvent = async(req,res)=>{
    try{

        const eventid = req.params.id;
        const events = await Event.findById({eventid});

        if(!events){
            return res.status(404).json({
                success:false,
                message:`No Event Found With this ${eventid}`,
            });
        }

        return res.status(200).json({
            success:true,
            message:events,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while finding Single Event",
        });
    }
    
}

exports.updateEvent = async(req,res)=>{

    try{

        const eventId = req.params.id;
        const{title,description,date} = req.body;
    
        const event = await Event.findById(eventId);
    
        if(!event){
            return res.status(404).json({
                success:false,
                message:`No Event found with this id: ${eventId}`,
            });
        }
    
        const userRole = req.user.role;
        const userId = req.user.id || req.user._id; // JWT payload uses 'id', fallback to '_id'
    
        // Check if user is the creator - handle both ObjectId and string comparison
        const eventCreatorId = event.createdBy.toString();
        const currentUserId = userId.toString();
        const isCreator = eventCreatorId === currentUserId;

        // Only Admin or the creator (Organizer who created it) can update
        if(userRole==="Admin" || isCreator){

            event.title = title;
            event.description = description;
            event.date = date;

            const updateEvent = await event.save();

            return res.status(200).json({
                success:true,
                message:"Event Updated Successfully",
                updateEvent:event,
            });
        }else{
            return res.status(403).json({
                success:false,
                message:"You are not allowed to update This Event",
            });
        }
    }catch(error){  
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error While Updating Event",
        });
    }
}

exports.deleteEvent = async(req,res)=>{
    try{
        const eventId = req.params.id;

        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                success:false,
                message:"No Event found with this id",
            });
        }

        const userRole = req.user.role;
        const userId = req.user.id || req.user._id; // JWT payload uses 'id', fallback to '_id'
        
        // Check if user is the creator - handle both ObjectId and string comparison
        const eventCreatorId = event.createdBy.toString();
        const currentUserId = userId.toString();
        const isCreator = eventCreatorId === currentUserId;

        // Only Admin or the creator can delete
        if(userRole === 'Admin' || isCreator){

            const response = await Event.findByIdAndDelete(eventId);

            return res.status(200).json({
                success:true,
                message:"Event has been deleted Successfully",
            });


        }else{
            return res.status(403).json({
                success:false,
                message:"You are not allowed to Delete this event",
            });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while Deleting the event",
        });
    }
}