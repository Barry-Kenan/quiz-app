import { useNow } from 'hooks/useNow';
import {
	createContext,
	MutableRefObject,
	ReactNode,
	useRef,
	useState
} from 'react';

export interface IGameContext {
	isLastPage?: boolean;
	setIsLastPage?: (isLastPage: boolean) => void;
	questionsDivRef?: MutableRefObject<HTMLDivElement>;
	isCounted?: boolean;
	setStartAt?: (startAt: number | (() => number)) => void;
	timeInSec?: number;
	countDownInSec?: number;
}

export const GameContext = createContext<IGameContext>({});

export const GameContextProvider = ({
	children
}: {
	children: ReactNode;
}): JSX.Element => {
	const [isLastPage, setIsLastPage] = useState<boolean>(false);
	const questionsDivRef = useRef<HTMLDivElement>();

	// таймер
	const time = 70000;
	const [startAt, setStartAt] = useState<number>();
	const now = useNow(1000, startAt);
	const fromStart = now - (startAt ?? now);
	const countDown = Math.max(0, time - fromStart);
	const isCounted = countDown == 0;

	const countDownInSec = Math.ceil(countDown / 1000);
	const timeInSec = Math.ceil(time / 1000);

	return (
		<GameContext.Provider
			value={{
				isLastPage,
				setIsLastPage,
				questionsDivRef,
				setStartAt,
				isCounted,
				timeInSec,
				countDownInSec
			}}
		>
			{children}
		</GameContext.Provider>
	);
};
