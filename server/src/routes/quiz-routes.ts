import express from 'express';
import { getAnswers, getQuestions } from '../controllers/quiz-controller';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.get('/questions', authenticate, getQuestions);
router.get('/answers', authenticate, getAnswers);

export default router;
