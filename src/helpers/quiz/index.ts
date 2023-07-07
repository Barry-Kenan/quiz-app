import { MutableRefObject } from 'react';

// скроллит вверх
export const scrollToTop = (scrollRef: MutableRefObject<HTMLDivElement>) => {
	scrollRef.current.scroll({
		top: 0,
		behavior: 'smooth'
	});
};

// считает количество правильных ответов
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function countScore(answers: any, form: any) {
	let correctAnswers = 0;
	const keys = Object.keys(answers);
	for (let i = 0; i < keys.length; i++) {
		if (answers[keys[i]] == form[keys[i]]) {
			correctAnswers++;
		}
	}
	return correctAnswers;
}
