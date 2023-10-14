import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser'
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('connected to MongoDB');
}).catch((err) => {
    console.log(err)
})

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
app.listen(3000, () => {
    console.log('server running on port 3000 !!')
})