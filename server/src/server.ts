// const express = require('express');
// const userRouter = require('./routes/userRoutes');
// const cors = require('cors');               //so that the server can accept requests from the client

import express from 'express';
import userRoute from './routes/user-route';
import adminAuthRoute from './routes/adminAuth-route';
import userAuthRoute from './routes/userAuth-route';
import articleRoute from './routes/article-route';
import eventRoute from './routes/events-route';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cookieParser());

// server Middlewares
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));


app.use(express.json());   

// global error handling middleware 
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Routes
app.use('/api/auth', adminAuthRoute);
app.use('/api/auth', userAuthRoute);
app.use('/api/users', userRoute);
app.use('/api/articles', articleRoute);
app.use('/api/events', eventRoute);


app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})