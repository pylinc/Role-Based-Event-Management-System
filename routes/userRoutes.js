const express = require('express');
const router = express.Router();

const{auth,isStudent} = require('../middlewares/auth');
const{eventRegistration} = require('../controllers/userController');
const {viewSingleEvent,viewAllEvent} = require('../controllers/eventController');

router.post('/user/register/:id',auth,isStudent,eventRegistration);
router.get('/user/viewallevents',auth,isStudent,viewAllEvent);
router.get('/user/viewsingleevent/:id',auth,isStudent,viewSingleEvent);


module.exports = router;