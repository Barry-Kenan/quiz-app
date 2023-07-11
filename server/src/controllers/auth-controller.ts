import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import Users from '../DBs/users.json';

const handleError = (res: Response, status: number, error: string) => {
	res.status(status).send({ message: error });
};
const handleSuccess = (res: Response) => {
	res.send({ message: 'success' });
};

export const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	if (!email || !password) {
		handleError(res, 500, 'email and password are required');
	}

	const user = Users.users.find(users => users.email == email);

	if (user) {
		handleError(res, 500, 'email exists in register');
	} else {
		const _user = {
			id: new Date().valueOf(),
			name,
			email,
			password: await bcrypt.hash(password, 10),
		};

		Users.users.push(_user);

		handleSuccess(res);
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = Users.users.find(users => users.email == email);

	if (!user) {
		return handleError(res, 400, 'Invalid credentials');
	}

	if (!(await bcrypt.compare(password, user.password))) {
		return handleError(res, 400, 'Invalid credentials');
	}

	const accessToken = sign(
		{
			id: user.id,
		},
		'access_secret',
		{ expiresIn: '30s' }
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
		maxAge: 24 * 60 * 1000, // 1 day
	});

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: true,
		maxAge: 7 * 24 * 60 * 1000, // 7 days
	});

	const { password: pass, ...data } = user;
	res.send(data);
};

export const refresh = (req: Request, res: Response) => {
	try {
		const refreshToken = req.cookies['refreshToken'];

		const payload: any = verify(refreshToken, 'refresh_secret');

		if (!payload) {
			return handleError(res, 401, 'Unauthenticated');
		}

		const accessToken = sign(
			{
				id: payload.id,
			},
			'access_secret',
			{ expiresIn: '30s' }
		);

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: true,
			maxAge: 24 * 60 * 1000, // 1 day
		});

		handleSuccess(res);
	} catch (e) {
		return handleError(res, 401, 'Unauthenticated');
	}
};

export const logout = (req: Request, res: Response) => {
	res.cookie('accessToken', '', { maxAge: 0 });
	res.cookie('refreshToken', '', { maxAge: 0 });

	handleSuccess(res);
};
