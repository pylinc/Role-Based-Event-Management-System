const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Importing routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

// Mounting the routes
app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Event Management API');
});

const connect = require('./config/database');
connect();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
