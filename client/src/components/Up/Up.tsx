import { CaretUpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import cn from 'classnames';
import { scrollToTop } from 'helpers/quiz';
import { useScrollY } from 'hooks/useScrollY';
import { FC, useEffect, useRef } from 'react';
import styles from './Up.module.scss';
import { UpProps } from './Up.props';

const Up: FC<UpProps> = ({ questionsDivRef }) => {
	const y = useScrollY(questionsDivRef);
	const ref = useRef<HTMLButtonElement>();
	useEffect(() => {
		ref.current.style.opacity = (
			y / questionsDivRef.current.scrollHeight
		).toString();
	}, [y]);

	return (
		<Button
			type='primary'
			onClick={() => scrollToTop(questionsDivRef)}
			className={cn(styles.up, {
				[styles.hidden]: y == 0
			})}
			ref={ref}
		>
			<CaretUpOutlined />
		</Button>
	);
};

export default Up;
