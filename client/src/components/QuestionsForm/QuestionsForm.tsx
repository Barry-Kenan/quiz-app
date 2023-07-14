import { Button } from 'antd';
import cn from 'classnames';
import QuestionCard from 'components/QuestionCard/QuestionCard';
import Timer from 'components/Timer/Timer';
import { countScore, scrollToTop } from 'helpers/quiz';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { useNow } from 'hooks/useNow';
import { IAnswers } from 'interfaces/answers.interface';
import { FC, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './QuestionsForm.module.scss';
import { QuestionsFormProps } from './QuestionsForm.props';

/**
 * Компонент форма вопросов
 * @param isLastPage boolean если страница последняя то true
 * @param questionsDivRef ref блока вопросов
 * @returns форму вопросов
 */
const QuestionsForm: FC<QuestionsFormProps> = ({
	isLastPage,
	questionsDivRef
}) => {
	const { changeStatus, changeScore } = useActions();
	const { questions, answers, status } = useAppSelector(
		state => state.quizReducer
	);
	const time = 70000;
	const [startAt, setStartAt] = useState<number>();
	const now = useNow(1000, startAt);
	const fromStart = now - (startAt ?? now);
	const countDown = Math.max(0, time - fromStart);
	const isCounted = countDown == 0;

	const {
		control,
		handleSubmit,
		getValues,
		formState: { isValid, isDirty }
	} = useForm<IAnswers>();

	const formRef = useRef<HTMLFormElement>();

	const result = (data: IAnswers) => {
		const score = countScore(answers, data);
		changeScore(score);
		changeStatus('finish');
		scrollToTop(questionsDivRef);
	};

	useEffect(() => {
		if (status == 'play') {
			setStartAt(Date.now);
			if (isCounted) {
				const data = getValues();
				result(data);
			}
		} else {
			setStartAt(0);
		}
	}, [status, isCounted]);

	// меняет статус на 'start' чтобы начать игру заново
	const handleClick = () => {
		changeStatus('start');
	};

	// при отправке формы считает количество правильных ответов, меняет статус и скроллит вверх
	const onSubmit = (formData: IAnswers) => {
		result(formData);
	};

	return (
		<>
			<form
				key={1}
				onSubmit={handleSubmit(onSubmit)}
				className={styles.form}
				ref={formRef}
			>
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
			<Timer
				time={Math.ceil(time / 1000)}
				countDown={Math.ceil(countDown / 1000)}
			/>
		</>
	);
};

export default QuestionsForm;
