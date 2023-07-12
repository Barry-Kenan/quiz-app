import axios from 'axios';

export const instanceApi = axios.create({
	baseURL: 'http://localhost:3001/api/'
});

export const quizApi = {
	getQuestions(page: number, limit: number) {
		return instanceApi
			.get('questions', {
				params: {
					limit,
					page
				}
			})
			.then(res => res.data);
	},

	getAnswers() {
		return instanceApi.get('answers').then(res => res.data);
	}
};
