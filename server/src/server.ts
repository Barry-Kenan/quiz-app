import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authRouter from './routes/auth-router';
import quizRoutes from './routes/quiz-routes';

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ['http://localhost:3000'],
		credentials: true,
	})
);
app.use(quizRoutes);
app.use(authRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
