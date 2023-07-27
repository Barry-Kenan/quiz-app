import { Progress } from 'antd';
import { secondsToHms } from 'helpers/quiz';
import { FC, memo, useMemo } from 'react';
import styles from './Timer.module.scss';
import { TimerProps } from './Timer.props';

/**
 * Компонент таймер
 * @param time начальная время таймера
 * @param countDown таймер
 */
const Timer: FC<TimerProps> = memo(({ time, countDown }) => {
	const forPercent = useMemo(() => 100 / time, [time]);
	const isSmall = useMemo(
		() => window.innerWidth < 694 ?? false,
		[window.innerWidth]
	);

	if (countDown == 0) {
		return <></>;
	}

	return (
		<div className={styles.timer}>
			<Progress
				type='circle'
				percent={countDown * forPercent}
				format={() => (
					<span className={styles.time}>{secondsToHms(countDown)}</span>
				)}
				strokeColor={{ '0%': '#1677ff', '100%': '#1677ff' }}
				size={isSmall ? 'small' : 'default'}
			/>
		</div>
	);
});

export default Timer;
