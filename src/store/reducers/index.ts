import { combineReducers } from 'redux';
import quizReducer from './quiz/quizReducer';

const rootReducer = combineReducers({ quizReducer });

export default rootReducer;
