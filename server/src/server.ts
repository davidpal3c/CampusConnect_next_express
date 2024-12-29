// const express = require('express');
// const userRouter = require('./routes/userRoutes');
// const cors = require('cors');               //so that the server can accept requests from the client

import express from 'express';
import userRoutes from './routes/user.route';
import cors from 'cors';

const app = express();
const PORT = 8080;


app.use(cors());
app.use('/api/users', userRoutes);

// app.get("/api/home", (req, res) => {
//   res.json({ message: "Welcome to CampusConnect!",
//     people: [
//         { name: "John", age: 25 },
//         { name: "Jane", age: 24 },
//         { name: "Jim", age: 30 },
//         { name: "Jill", age: 28 },
//         { name: "Jack", age: 27 }
//     ]
//   });
// });

app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})