import { Button, Pagination } from 'antd';
import cn from 'classnames';
import { FinishQuiz, Loading, QuestionCard } from 'components';
import { countScore } from 'helpers/quiz/countScore';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { IAnswers } from 'interfaces/answers.interface';
import { FC, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './GamePage.module.scss';

const GamePage: FC = () => {
	const [lastPage, setLastPage] = useState<boolean>(false);
	const {
		questions: q,
		questionsCount,
		answers,
		status,
		loading
	} = useAppSelector(state => state.quizReducer);
	const { changeStatus, getQuestionsAction, changeScore } = useActions();

	const ref = useRef<HTMLDivElement>();

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
	};

	const onChange = (page: number, pageSize: number) => {
		getQuestionsAction({ page, pageSize });
		setLastPage(questionsCount / pageSize == page);
		ref.current.scroll({
			top: 0,
			behavior: 'smooth'
		});
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div
					className={cn(styles.questions, {
						[styles.finish]: status == 'finish'
					})}
					ref={ref}
				>
					{q.map(e => (
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
						{lastPage && (
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
			<div className={styles.pagination}>
				<Pagination
					defaultCurrent={1}
					total={questionsCount}
					pageSize={5}
					onChange={onChange}
					disabled={!isValid && !lastPage}
				/>
			</div>
			{status == 'finish' && <FinishQuiz />}
		</div>
	);
};

export default GamePage;
