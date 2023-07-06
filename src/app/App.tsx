import 'antd/dist/reset.css';
import { useAppSelector } from 'hooks/redux';
import { withLayout } from 'layout/Layout';
import { FinishPage, GamePage, StartPage } from 'pages';
import { FC } from 'react';

const App: FC = () => {
	const { status } = useAppSelector(state => state.quizReducer);

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
