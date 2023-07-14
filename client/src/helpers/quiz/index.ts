import { IAnswers } from 'interfaces/answers.interface';
import { MutableRefObject } from 'react';

// скроллит вверх
export const scrollToTop = (scrollRef: MutableRefObject<HTMLDivElement>) => {
	scrollRef.current.scroll({
		top: 0,
		behavior: 'smooth'
	});
};

// считает количество правильных ответов
export function countScore(answers: IAnswers, form: IAnswers) {
	let correctAnswers = 0;
	const keys = Object.keys(answers);
	for (let i = 0; i < keys.length; i++) {
		if (answers[keys[i] as keyof IAnswers] == form[keys[i] as keyof IAnswers]) {
			correctAnswers++;
		}
	}
	return correctAnswers;
}

export function secondsToHms(d: number) {
	d = Number(d);
	const h = Math.floor(d / 3600);
	const m = Math.floor((d % 3600) / 60);
	const s = Math.floor((d % 3600) % 60);

	const hDisplay = h > 0 ? h + 'h' : '';
	const mDisplay = m > 0 ? m + 'm' : '';
	const sDisplay = s > 0 ? s + 's' : '';
	return hDisplay + mDisplay + sDisplay;
}
