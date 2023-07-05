import axios from 'axios';

export const instanceApi = axios.create({
	baseURL: 'http://localhost:3001/'
});

export const quizApi = {
	getQuestions() {
		return instanceApi.get('questions').then(res => res.data);
	}
};
