import { Question } from 'interfaces/question.interface';
import { rootActions } from 'store/actions/index';
import quizReducer, { QuizState } from './quiz.reducer';

let state: QuizState;

beforeEach(() => {
	state = {
		loadingQuestions: false,
		score: 0,
		status: 'start',
		questions: [],
		questionsCount: 0,
		answers: null
	};
});

test('Loading is true', () => {
	const newState = quizReducer(
		state,
		rootActions.quizActions.loadingQuestions(true)
	);
	expect(newState.loadingQuestions).toBeTruthy();
});

test('Score is 10', () => {
	const newState = quizReducer(state, rootActions.quizActions.changeScore(10));
	expect(newState.score).toBe(10);
});

test('Set questions', () => {
	const questions: Question[] = [
		{
			id: '1aaa',
			prompt: 'Столица России',
			choices: [
				{ id: 'a', content: 'Москва' },
				{ id: 'b', content: 'Томск' },
				{ id: 'c', content: 'Таллин' },
				{ id: 'd', content: 'Рига' }
			],
			answer: 'c'
		}
	];
	const newState = quizReducer(
		state,
		rootActions.quizActions.setQuestions(questions)
	);
	expect(newState.questions.length).toBe(1);
});
