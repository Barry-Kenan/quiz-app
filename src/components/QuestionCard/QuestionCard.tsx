import { Card, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FC } from 'react';
import styles from './QuestionCard.module.scss';
import { QuestionCardProps } from './QuestionCard.props';

const QuestionCard: FC<QuestionCardProps> = ({
	title,
	choices,
	checked,
	setChecked
}) => {
	const onChange = (e: CheckboxChangeEvent) => {
		console.log(e.target.name);
		setChecked(e.target.name);
	};
	return (
		<Card title={title}>
			<ul className={styles.choices}>
				{choices.map(k => (
					<Checkbox
						key={k.id}
						checked={checked == k.id}
						name={k.id}
						onChange={onChange}
					>
						{k.content}
					</Checkbox>
				))}
			</ul>
		</Card>
	);
};
export default QuestionCard;
