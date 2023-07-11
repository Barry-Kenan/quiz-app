import express from 'express';
import {
	authenticatedUser,
	login,
	logout,
	refresh,
	register,
} from '../controllers/auth-controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticatedUser);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
