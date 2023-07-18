import { Request, Response } from 'express';
import { db } from '../server';

const handleError = (res: Response) => {
	res.status(500).json('Что-то пошло не так');
};

export const getQuestions = async (req: Request, res: Response) => {
	try {
		const { limit = 5, page = 1 } = req.query;
		const questionsRef = db.collection('questions');
		const { count: totalCount } = (await questionsRef.count().get()).data();
		const response = await questionsRef
			.limit(Number(limit))
			.offset((Number(page) - 1) * Number(limit))
			.get();
		const questions = [];
		response.forEach(doc => {
			const id = doc.id;
			questions.push({ id, ...doc.data() });
		});
		res.status(200).json({ questions, totalCount });
	} catch (error) {
		handleError(res);
	}
};

export const getAnswers = async (req: Request, res: Response) => {
	try {
		const questionsRef = db.collection('questions');
		const response = await questionsRef.get();
		let answers = {};
		response.forEach(doc => {
			const { answer } = doc.data();
			answers[doc.id] = answer;
		});
		res.status(200).json(answers);
	} catch (error) {
		handleError(res);
	}
};

export const addQuestions = (req: Request, res: Response) => {
	db.collection('questions').add(req.body);
	res.send({ message: 'success' });
};
