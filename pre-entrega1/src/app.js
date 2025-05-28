import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

import passport from 'passport';
import initializePassport from './config/passport.config.js'

import usersViewRouter from './routes/users.views.routes.js'
import sessionsRouter from './routes/sessions.routes.js'
import viewsRouter from './routes/views.routes.js'
import __dirname from './utils.js';

/* Creo que no esta muy bien Profe perdon :( */

const app = express();
const SERVER_PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

const MONGO_URL = "mongodb://localhost:27017/Clase02";

app.use(cookieParser("CoderS3cr3tC0d3"));

initializePassport();
app.use(passport.initialize());

app.use('/', viewsRouter)
app.use('/users', usersViewRouter)
app.use('/api/sessions', sessionsRouter)



app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB");
        process.exit();
    }
}
connectMongoDB();