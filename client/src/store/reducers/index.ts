import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import quizReducer from './quiz/quiz.reducer';

const rootReducer = combineReducers({ quizReducer, authReducer });

export default rootReducer;
