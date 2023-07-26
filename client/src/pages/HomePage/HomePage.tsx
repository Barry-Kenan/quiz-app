import { useAppSelector } from 'hooks/redux';
import { Game, Start } from 'modules';
import { FC } from 'react';

const HomePage: FC = () => {
	const { status } = useAppSelector(state => state.quizReducer);

	if (status == 'start') {
		return <Start />;
	} else {
		return <Game />;
	}
};

export default HomePage;
