import { GamePage, StartPage } from 'components';
import { useAppSelector } from 'hooks/redux';
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
