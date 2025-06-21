import express from 'express';
import __dirname from './util.js';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';

//Routers a importar:
import studentRouter from './routes/students.router.js'
import coursesRouter from './routes/courses.router.js'
import emailRouter from './routes/email.router.js';
import smsRouter from './routes/sms.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/students", studentRouter);
app.use("/api/courses", coursesRouter);

// Mensajeria
app.use("/api/email", emailRouter);
app.use("/api/sms", smsRouter);

app.listen(config.port, () => {
    console.log("Servidor escuchando por el puerto: " + config.port);
});

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error(error);
        process.exit();
    }
};
mongoInstance();