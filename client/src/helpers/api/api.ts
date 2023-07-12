import axios from 'axios';
import { IUser } from 'interfaces/user.interface';

export const instanceApi = axios.create({
	baseURL: 'http://localhost:3001/api/',
	withCredentials: true
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

export const authApi = {
	login(data: Omit<IUser, 'id' | 'name'>) {
		return instanceApi.post('auth/login', data);
	}
};
