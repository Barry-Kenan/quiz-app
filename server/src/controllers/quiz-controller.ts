import { Request, Response } from 'express';
import Quiz from '../DBs/quiz-db.json';

const handleError = (res: Response) => {
	res.status(500).json('Что-то пошло не так');
};

export const getQuestions = (req: Request, res: Response) => {
	const { limit = 5, page = 1 } = req.query;
	const allQuestions = Quiz.questions;
	const totalCount = Quiz.questions.length;
	if (allQuestions) {
		const from = (Number(page) - 1) * Number(limit);
		const to = from + Number(limit);
		const questions = allQuestions.slice(from, to);
		res.status(200).json({ questions, totalCount });
	} else {
		handleError(res);
	}
};

export const getAnswers = (req: Request, res: Response) => {
	const answers = Quiz.answers;
	if (answers) {
		res.status(200).json(answers);
	} else {
		handleError(res);
	}
};
