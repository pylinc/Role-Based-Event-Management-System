const express =require('express');
const router = express.Router();

const {auth,isAdminOrOrganizer} = require('../middlewares/auth');

const {createEvent,viewAllEvent,viewSingleEvent,updateEvent,deleteEvent} = require('../controllers/eventController');

router.post('/event/create',auth,isAdminOrOrganizer,createEvent);

router.get('/event/all',viewAllEvent);

router.get('/event/:id',viewSingleEvent);

router.put('/event/update/:id',auth,updateEvent);

router.delete('/event/deleteevent/:id',auth,deleteEvent);

module.exports = router;