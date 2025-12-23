const mongoose = require('mongoose');
require('dotenv').config();

const connect = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Database is Connected"))
    .catch((error)=>{
        console.log("Unable To connect to Database");
        console.error(error);
        process.exit(1);
    });
}
module.exports = connect;

