import { Button } from 'antd';
import cn from 'classnames';
import Loading from 'components/Loading/Loading';
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
	const { questions, answers, status, loadingQuestions } = useAppSelector(
		state => state.quizReducer
	);
	const {
		control,
		handleSubmit,
		getValues,
		formState: { isValid, isDirty }
	} = useForm<IAnswers>();

	const formRef = useRef<HTMLFormElement>();

	// таймер
	const time = 70000;
	const [startAt, setStartAt] = useState<number>();
	const now = useNow(1000, startAt);
	const fromStart = now - (startAt ?? now);
	const countDown = Math.max(0, time - fromStart);
	const isCounted = countDown == 0;

	// подсчет ответов и изменение статуса
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

	// при отправке формы считает количество правильных ответов, меняет статус и скроллится вверх
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
				{loadingQuestions ? (
					<div className={styles.loading}>
						<Loading />
					</div>
				) : (
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
						{isLastPage && status != 'finish' && !loadingQuestions && (
							<Button
								type='primary'
								htmlType='submit'
								disabled={!isValid || !isDirty}
							>
								Завершить игру
							</Button>
						)}
					</div>
				)}
			</form>
			<Timer
				time={Math.ceil(time / 1000)}
				countDown={Math.ceil(countDown / 1000)}
			/>
		</>
	);
};

export default QuestionsForm;
