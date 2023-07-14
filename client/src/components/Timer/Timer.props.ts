import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface TimerProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	time: number;
	countDown: number;
}
