import { CaretUpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { scrollToTop } from 'helpers/quiz';
import { useScrollY } from 'hooks/useScrollY';
import { useEffect, useRef } from 'react';
import styles from './Up.module.scss';

const Up = ({
	questionsDivRef
}: {
	questionsDivRef: React.MutableRefObject<HTMLDivElement>;
}) => {
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
			className={styles.up}
			ref={ref}
		>
			<CaretUpOutlined />
		</Button>
	);
};

export default Up;
