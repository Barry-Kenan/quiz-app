/* eslint-disable @typescript-eslint/no-explicit-any */
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
