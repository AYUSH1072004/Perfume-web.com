import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './router/userRouter.js'
import connectDB from './db/db.js'
import cookieParser from 'cookie-parser';
import CORS from 'cors'



dotenv.config();

const app = express();
app.use(express.json());
app.use(CORS({
    origin: ["http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));

app.use(cookieParser());

const port = process.env.PORT || 3000;


app.use('/auth/api', userRoutes)

connectDB().
    then(() => {
        app.listen(port, () => {
            console.log(`server is running on port http://localhost:${port}`);
        });
    }).catch((err) => {
        console.log(err)
    })
