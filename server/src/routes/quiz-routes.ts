import express from 'express';
import { getAnswers, getQuestions } from '../controllers/quiz-controller';

const router = express.Router();

router.get('/questions', getQuestions);
router.get('/answers', getAnswers);

export default router;
