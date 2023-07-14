import { useLayoutEffect, useState } from 'react';

/**
 * хук для работы с таймером
 * @param updateInterval интервал в миллисекундах
 * @param enabled включение
 * @returns now: number в миллисекундах
 */
export function useNow(updateInterval: number, enabled: number) {
	const [now, setNow] = useState(Date.now());

	useLayoutEffect(() => {
		if (!enabled) {
			return;
		}

		setNow(Date.now());

		const interval = setInterval(() => {
			setNow(Date.now());
		}, updateInterval);

		return () => {
			clearInterval(interval);
		};
	}, [updateInterval, enabled]);
	return now;
}
