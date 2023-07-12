import { useAppSelector } from 'hooks/redux';
import GamePage from 'pages/GamePage/GamePage';
import StartPage from 'pages/StartPage/StartPage';
import { FC } from 'react';

const HomePage: FC = () => {
	const { status } = useAppSelector(state => state.quizReducer);

	if (status == 'start') {
		return <StartPage />;
	} else {
		return <GamePage />;
	}
};

export default HomePage;
