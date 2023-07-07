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

const QuestionsForm: FC<QuestionsFormProps> = ({
	isLastPage,
	questionsDivRef,
	setIsValid
}) => {
	const { changeStatus, changeScore } = useActions();
	const { questions, answers, status } = useAppSelector(
		state => state.quizReducer
	);

	const handleClick = () => {
		changeStatus('start');
	};
	const {
		control,
		handleSubmit,
		formState: { isValid, isDirty }
	} = useForm<IAnswers>();

	const onSubmit = (formData: IAnswers) => {
		console.log(formData);
		const score = countScore(answers, formData);
		changeScore(score);
		changeStatus('finish');
		scrollToTop(questionsDivRef);
	};

	useEffect(() => {
		setIsValid(isValid);
	}, [isValid, setIsValid]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div
				className={cn(styles.questions, {
					[styles.finish]: status == 'finish'
				})}
				ref={questionsDivRef}
			>
				{questions.map(e => (
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
		</form>
	);
};

export default QuestionsForm;
