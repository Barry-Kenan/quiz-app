import { Progress } from 'antd';
import { FC } from 'react';
import styles from './Timer.module.scss';
import { TimerProps } from './Timer.props';

const Timer: FC<TimerProps> = ({ time }) => {
	if (time == 0) {
		return <></>;
	}

	return (
		<div className={styles.timer}>
			<Progress
				type='circle'
				percent={time * 5}
				format={() => <span className={styles.time}>{time}</span>}
				strokeColor={{ '0%': '#1677ff', '100%': '#1677ff' }}
			/>
		</div>
	);
};

export default Timer;
