import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { rootActions } from 'store/actions';

const actions = { ...rootActions.quizActions, ...rootActions.authActions };

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(actions, dispatch);
};
