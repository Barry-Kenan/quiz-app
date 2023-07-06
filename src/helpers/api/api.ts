import axios from 'axios';

export const instanceApi = axios.create({
	baseURL: 'http://localhost:3001/'
});

export const quizApi = {
	getQuestions(_page: number, _limit: number) {
		return instanceApi.get('questions', {
			params: {
				_limit,
				_page
			}
		});
	}
};
