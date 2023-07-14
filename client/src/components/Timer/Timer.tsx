import { Progress } from 'antd';
import { secondsToHms } from 'helpers/quiz';
import { FC } from 'react';
import styles from './Timer.module.scss';
import { TimerProps } from './Timer.props';

/**
 * Компонент таймер
 * @param time начальная время таймера
 * @param countDown таймер
 */
const Timer: FC<TimerProps> = ({ time, countDown }) => {
	if (countDown == 0) {
		return <></>;
	}

	const forPercent = 100 / time;
	return (
		<div className={styles.timer}>
			<Progress
				type='circle'
				percent={countDown * forPercent}
				format={() => (
					<span className={styles.time}>{secondsToHms(countDown)}</span>
				)}
				strokeColor={{ '0%': '#1677ff', '100%': '#1677ff' }}
			/>
		</div>
	);
};

export default Timer;
