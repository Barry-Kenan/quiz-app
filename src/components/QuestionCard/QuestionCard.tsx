import { Card, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import styles from './QuestionCard.module.scss';
import { QuestionCardProps } from './QuestionCard.props';

const QuestionCard: FC<QuestionCardProps> = ({
	title,
	choices,
	checked,
	setChecked
}) => {
	const { status } = useAppSelector(state => state.quizReducer);

	const onChange = (e: CheckboxChangeEvent) => {
		setChecked(e.target.name);
	};
	return (
		<Card title={title} className={styles.card}>
			<ul className={styles.choices}>
				{choices.map(k => (
					<Checkbox
						key={k.id}
						checked={checked == k.id}
						name={k.id}
						onChange={onChange}
						disabled={status == 'finish'}
					>
						{k.content}
					</Checkbox>
				))}
			</ul>
		</Card>
	);
};
export default QuestionCard;
