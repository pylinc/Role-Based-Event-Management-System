const express = require('express');
const router = express.Router();


const {signup, login} = require('../controllers/authController');
const {auth} = require('../middlewares/auth');

router.post('/signup',signup);
router.post('/login',login);

router.get("/me", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "You are authenticated",
        user: req.user,
    });
});

module.exports = router;

