import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db.js';


dotenv.config();
const port = process.env.PORT || 8080;
const app = express();



app.listen(port, () => console.log(`Server running on port ${port}`));
// Connect to MongoDB
connectDb();

  