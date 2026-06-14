import express from 'express';
import { connectDB, disconnectDB } from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';

import authRouter from './routes/authRoute.js'
import boardRouter from './routes/boardRoute.js'
import taskRouter from './routes/task.Route.js'

// Connect to PostgreSQL database
connectDB();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth',authRouter);
app.use('/board',boardRouter);
app.use('/task',taskRouter);

// Basic Health Check Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Task/Board Management API!' });
});


// Global Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown & Unhandled Exception Handling
process.on('unhandledRejection', async (err) => {
    console.error('Unhandled Rejection:', err);
    await disconnectDB();
    process.exit(1);
});

process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    await disconnectDB();
    process.exit(1);
});

process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    await disconnectDB();
    process.exit(0);
});
