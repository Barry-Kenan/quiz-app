import { IAnswers } from 'interfaces/answers.interface';
import { countScore, secondsToHms } from './index';

describe('seconds to HMS', () => {
	test('Seconds to Hms', () => {
		expect(secondsToHms(3661)).toBe('1h1m1s');
		expect(secondsToHms(70)).toBe('1m10s');
		expect(secondsToHms(59)).toBe('59s');
	});
});

const answers: IAnswers = {
	'0aaa': 'a',
	'1aaa': 'b',
	'2aaa': 'c',
	'3aaa': 'd',
	'4aaa': 'a',
	'5aaa': 'b',
	'6aaa': 'c',
	'7aaa': 'd',
	'8aaa': 'a',
	'9aaa': 'b'
};

const form: IAnswers = {
	'0aaa': 'a',
	'1aaa': 'b',
	'2aaa': 'c',
	'3aaa': 'c',
	'4aaa': 'a',
	'5aaa': 'b',
	'6aaa': 'c',
	'7aaa': 'd',
	'8aaa': 'a',
	'9aaa': 'c'
};

describe('correct answers', () => {
	test('8 correct answers', () => {
		expect(countScore(answers, form)).toBe(8);
	});
});
