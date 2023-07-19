import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { IUser } from '../interfaces/user';
import { db } from '../server';

const handleError = (res: Response, status: number, error: string) => {
	res.status(status).send({ message: error });
};
const handleSuccess = (res: Response) => {
	res.send({ message: 'success' });
};

/**
 * Регистрация
 */
export const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	if (!email || !password) {
		handleError(res, 500, 'Почта и паспорт обязательны');
	}

	const usersRef = db.collection('users');
	const users = await usersRef.where('email', '==', email).get();

	if (!users.empty) {
		handleError(
			res,
			500,
			'Аккаунт, использующий указанный Вами адрес электронной почты, уже существует'
		);
	} else {
		const _user = {
			name,
			email,
			password: await bcrypt.hash(password, 10),
		};

		usersRef.add(_user);
		handleSuccess(res);
	}
};

/**
 * Логин
 */
export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const usersRef = db.collection('users');
	const users = await usersRef.where('email', '==', email).get();
	let user: IUser;
	users.forEach(doc => {
		user = { id: doc.id, ...doc.data() } as IUser;
	});

	if (users.empty) {
		return handleError(res, 400, 'Недействительные учетные данные');
	}

	if (!(await bcrypt.compare(password, user.password))) {
		return handleError(res, 400, 'Недействительные учетные данные');
	}

	const accessToken = sign(
		{
			id: user.id,
		},
		'access_secret',
		{ expiresIn: '1h' }
	);

	const refreshToken = sign(
		{
			id: user.id,
		},
		'refresh_secret',
		{ expiresIn: '7d' }
	);

	res.cookie('accessToken', accessToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 24 * 60 * 1000, // 1 day
	});

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 7 * 24 * 60 * 1000, // 7 days
	});

	const { password: pass, ...data } = user;
	res.send(data);
};

/**
 * Проверка аутентификации
 */
export const authenticatedUser = async (req: Request, res: Response) => {
	try {
		const accessToken = req.cookies['accessToken'];

		const payload: any = verify(accessToken, 'access_secret');

		if (!payload) {
			return handleError(res, 401, 'Вы не авторизованы');
		}

		const userRef = db.collection('users').doc(payload.id);
		const response = await userRef.get();
		const user = response.data();

		if (!user) {
			return handleError(res, 401, 'Вы не авторизованы');
		}

		const { password, ...data } = user;
		res.send({ ...data, id: response.id });
	} catch (e) {
		return handleError(res, 401, 'Вы не авторизованы');
	}
};

/**
 * Обновление access token-а
 */
export const refresh = (req: Request, res: Response) => {
	try {
		const refreshToken = req.cookies['refreshToken'];

		const payload: any = verify(refreshToken, 'refresh_secret');

		if (!payload) {
			return handleError(res, 401, 'Вы не авторизованы');
		}

		const accessToken = sign(
			{
				id: payload.id,
			},
			'access_secret',
			{ expiresIn: '1h' }
		);

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 24 * 60 * 1000, // 1 day
		});

		handleSuccess(res);
	} catch (e) {
		return handleError(res, 401, 'Вы не авторизованы');
	}
};

export const logout = (req: Request, res: Response) => {
	res.cookie('accessToken', '', {
		maxAge: 0,
		secure: true,
		httpOnly: true,
		sameSite: 'none',
	});
	res.cookie('refreshToken', '', {
		maxAge: 0,
		secure: true,
		httpOnly: true,
		sameSite: 'none',
	});

	handleSuccess(res);
};
