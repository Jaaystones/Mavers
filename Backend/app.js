const dotenv = require('dotenv');
require('express-async-errors');
const express = require('express')
const app = express();
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
//const firebaseAdmin = require('./config/firebaseAdmin');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const  mongoDb = require('./config/dbConfig');
const mongoose = require('mongoose');
dotenv.config();
const PORT = process.env.PORT || 10000

console.log(process.env.NODE_ENV);

//connect to DB
mongoDb();



//middlewares
app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser())
//app.use(express.urlencoded({extended: false}));
//app.use(bodyParser.json());


app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/api/', passwordRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reminders', reminderRoutes);

//home route
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '/views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
})

app.use(errorHandler);

//Start the server with listener.
mongoose.connection.once( "open", ()=> {
    console.log('Starting Server');

app.listen(PORT, () =>
console.log(`SERVER RUNNING ON PORT ${PORT}`));
});

mongoose.connection.once('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});
