import 'antd/dist/reset.css';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { withLayout } from 'layout/Layout';
import { FinishPage, GamePage, StartPage } from 'pages';
import { FC, useEffect } from 'react';

const App: FC = () => {
	const { status } = useAppSelector(state => state.quizReducer);
	const { getQuestionsAction } = useActions();

	useEffect(() => {
		getQuestionsAction();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	switch (status) {
		case 'start':
			return <StartPage />;
		case 'play':
			return <GamePage />;
		case 'finish':
			return <FinishPage />;
		default: {
			const never: never = status;
			return never;
		}
	}
};

export default withLayout(App);
