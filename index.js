import 'dotenv/config';
import express from 'express';
import userRouter from './src/routes/user.route.js';

const app = express();
const PORT = process.env.PORT ?? 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));