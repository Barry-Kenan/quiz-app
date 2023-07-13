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
	},

	register(data: Omit<IUser, 'id'>) {
		return instanceApi.post('auth/register', data).then(res => res.status);
	},

	logout() {
		return instanceApi.post('auth/logout').then(res => res.status);
	},

	refresh() {
		return instanceApi.post('auth/refresh');
	},

	user() {
		return instanceApi.get('auth/user').then(res => res.data);
	}
};
