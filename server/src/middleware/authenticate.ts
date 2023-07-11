import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import Users from '../DBs/users.json';

const handleError = (res: Response, status: number, error: string) => {
	res.status(status).send({ message: error });
};

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const accessToken = req.cookies['accessToken'];

		const payload: any = verify(accessToken, 'access_secret');

		if (!payload) {
			return handleError(res, 401, 'Unauthenticated');
		}

		const user = Users.users.find(users => users.id == payload.id);

		if (!user) {
			return handleError(res, 401, 'Unauthenticated');
		}

		next();
	} catch (e) {
		return handleError(res, 401, 'Unauthenticated');
	}
};
