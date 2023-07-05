import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { quizActions } from 'store/reducers/quiz/quiz.actions';

const actions = { ...quizActions };

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(actions, dispatch);
};
