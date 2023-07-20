import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import admin from 'firebase-admin';
import credentials from '../key.json';
import authRouter from './routes/auth-router';
import quizRoutes from './routes/quiz-routes';

const PORT = 3001;
admin.initializeApp({
	credential: admin.credential.cert(credentials as admin.ServiceAccount),
});

export const db = admin.firestore();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'https://quiz-app-fxl4.vercel.app',
			'https://quiz-app-54072.web.app',
		],
		credentials: true,
	})
);
app.use('/api', quizRoutes);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;
