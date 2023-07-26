import { Progress } from 'antd';
import { secondsToHms } from 'helpers/quiz';
import { FC, useMemo } from 'react';
import styles from './Timer.module.scss';
import { TimerProps } from './Timer.props';

/**
 * Компонент таймер
 * @param time начальная время таймера
 * @param countDown таймер
 */
const Timer: FC<TimerProps> = ({ time, countDown }) => {
	const forPercent = useMemo(() => 100 / time, [time]);
	const isSmall = window.innerWidth < 694 ?? false;

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
};

export default Timer;
