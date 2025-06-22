import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import cors from 'cors';
dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:8080', // change to your frontend URL
    credentials: true, // if using cookies or authentication headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly list methods
    allowedHeaders: ['Content-Type', 'Authorization'],    // Accept JSON headers etc.
}));



app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to DB
console.log('Mongo URI:', process.env.MONGO_URI);

mongoose.connect('mongodb://localhost:27017/WinWave_DB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

export default app;
