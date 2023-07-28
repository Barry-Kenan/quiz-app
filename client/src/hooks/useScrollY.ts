import { MutableRefObject, useEffect, useState } from 'react';

export const useScrollY = (ref: MutableRefObject<HTMLDivElement>): number => {
	const [scrollY, setScrollY] = useState<number>(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = ref.current?.scrollTop;
			setScrollY(currentScrollY);
		};
		ref.current.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			ref.current?.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return scrollY;
};
