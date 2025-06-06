// const express = require('express');
import express from 'express';
import userRoute from './routes/user-route';
import adminAuthRoute from './routes/adminAuth-route';
import userAuthRoute from './routes/userAuth-route';
import articleRoute from './routes/article-route';
import eventRoute from './routes/events-route';
import audienceRoute from './routes/audience-route';
import academicRoute from './routes/academic-route';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmetMiddleware from './utils/helmet';
import helmet from 'helmet';
import { rateLimiter } from './utils/rateLimiter';

dotenv.config();

const app = express();
const PORT = 8080;

// server Middlewares
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Helmet middleware for security headers
if (process.env.NODE_ENV === 'production') {
  helmetMiddleware(app);
} else {
  app.use(helmet({
    crossOriginResourcePolicy: false, 
    contentSecurityPolicy: false, 
  }));
}


// Rate limiting middleware
app.use(rateLimiter);


// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', adminAuthRoute);
app.use('/api/auth', userAuthRoute);
app.use('/api/users', userRoute);
app.use('/api/articles', articleRoute);
app.use('/api/audience', audienceRoute);
app.use('/api/academic', academicRoute);
app.use('/api/events', eventRoute);

app.get('/', (req, res) => {
  res.json('Hello from the server!');
})


app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend is running',
    timestamp: new Date(),
  });
});

// app.get('/api/routes', (req, res) => {
//   const routes: string[] = [];

//   app._router.stack.forEach((middleware: any) => {
//     if (middleware.route) {
//       // routes registered directly on the app
//       routes.push(middleware.route.path);
//     } else if (middleware.name === 'router') {
//       // router middleware 
//       middleware.handle.stack.forEach((handler: any ) => {
//         const routePath = handler.route?.path;
//         if (routePath) {
//           routes.push(routePath);
//         }
//       });
//     }
//   });

//   res.json({ routes });
// });


// global error handling middleware 
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})
