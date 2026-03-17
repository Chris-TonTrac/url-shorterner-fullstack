import 'dotenv/config';
import express from 'express';
import userRouter from './src/routes/user.routes.js';
import urlRouter from './src/routes/url.routes.js';

const app = express();
const PORT = process.env.PORT ?? 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/user', userRouter);
app.use('/', urlRouter);

// Fallback error handler so the frontend gets structured JSON instead of dropped connections.
app.use((error, req, res, next) => {
	console.error('Unhandled server error:', error);
	return res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));