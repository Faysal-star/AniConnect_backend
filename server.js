import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

// routes
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
// import recomRoutes from './routes/recomRoutes.js';

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello AniConnect');
});

app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chat', chatRoutes);
// app.use('/api/recommendations', recomRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Sed, hoyto apnar vul noyto amar vul', error: err.message });
});

// 404 Route
app.use((req, res) => {
    res.status(404).json({ message: 'Route Nai to' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server choltese ${PORT} e`);
});
