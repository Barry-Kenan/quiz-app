import { Card, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppSelector } from 'hooks/redux';
import { FC, memo } from 'react';
import styles from './QuestionCard.module.scss';
import { QuestionCardProps } from './QuestionCard.props';

/**
 * Компонент карточка вопросов
 * @param title:Вопрос
 * @param choice:Варианты ответов
 * @param checked:id вариантов (например 'a')
 * @param SetChecked:для изменение состояние checked
 * @returns карточку с вопросами
 */
const QuestionCard: FC<QuestionCardProps> = memo(
	({ title, choices, checked, setChecked }) => {
		const { status } = useAppSelector(state => state.quizReducer);

		// при нажатии на чекбокс изменяет состояние
		const onChange = (e: CheckboxChangeEvent) => {
			setChecked(e.target.name);
		};
		return (
			<Card title={title} className={styles.card}>
				<ul className={styles.choices}>
					{choices &&
						choices.map(k => (
							<Checkbox
								key={k.id}
								checked={checked == k.id}
								name={k.id}
								onChange={onChange}
								disabled={status === 'finish'}
							>
								{k.content}
							</Checkbox>
						))}
				</ul>
			</Card>
		);
	}
);
export default QuestionCard;
