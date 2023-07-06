import 'antd/dist/reset.css';
import { useAppSelector } from 'hooks/redux';
import { withLayout } from 'layout/Layout';
import { GamePage, StartPage } from 'pages';
import { FC } from 'react';

const App: FC = () => {
	const { status } = useAppSelector(state => state.quizReducer);

	if (status == 'start') {
		return <StartPage />;
	} else {
		return <GamePage />;
	}
};

export default withLayout(App);
