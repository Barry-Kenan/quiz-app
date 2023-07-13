import { Button } from 'antd';
import cn from 'classnames';
import QuestionCard from 'components/QuestionCard/QuestionCard';
import { countScore, scrollToTop } from 'helpers/quiz';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { IAnswers } from 'interfaces/answers.interface';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './QuestionsForm.module.scss';
import { QuestionsFormProps } from './QuestionsForm.props';

/**
 * Компонент форма вопросов
 * @param isLastPage boolean если страница последняя то true
 * @param questionsDivRef ref блока вопросов
 * @param setIsValid boolean валидность формы
 * @returns форму вопросов
 */
const QuestionsForm: FC<QuestionsFormProps> = ({
	isLastPage,
	questionsDivRef,
	setIsValid
}) => {
	const { changeStatus, changeScore, loading } = useActions();
	const { questions, answers, status } = useAppSelector(
		state => state.quizReducer
	);
	const {
		control,
		handleSubmit,
		formState: { isValid, isDirty }
	} = useForm<IAnswers>();

	// меняет статус на 'start' чтобы начать игру заново
	const handleClick = () => {
		changeStatus('start');
	};

	// при отправке формы считает количество правильных ответов, меняет статус и скроллит вверх
	const onSubmit = (formData: IAnswers) => {
		loading(true);
		const score = countScore(answers, formData);
		changeScore(score);
		changeStatus('finish');
		scrollToTop(questionsDivRef);
		loading(false);
	};

	// присваивает значение isValid нужен для родительского компонента
	useEffect(() => {
		setIsValid(isValid);
	}, [isValid, setIsValid]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={cn(styles.questions)} ref={questionsDivRef}>
				{questions.length &&
					questions.map(e => (
						<Controller
							key={e.id}
							control={control}
							name={e.id}
							rules={{
								required: {
									value: true,
									message: 'Выберите ответ'
								}
							}}
							render={({ field }) => (
								<QuestionCard
									title={e.prompt}
									choices={e.choices}
									checked={field.value}
									setChecked={field.onChange}
								/>
							)}
						/>
					))}
			</div>
			<div>
				{status != 'finish' ? (
					<div className={styles.button}>
						{isLastPage && (
							<Button
								type='primary'
								htmlType='submit'
								disabled={!isValid || !isDirty}
							>
								Завершить игру
							</Button>
						)}
					</div>
				) : (
					<div className={styles.button}>
						<Button
							type='primary'
							className={styles.button}
							onClick={handleClick}
						>
							Начать заново
						</Button>
					</div>
				)}
			</div>
		</form>
	);
};

export default QuestionsForm;
