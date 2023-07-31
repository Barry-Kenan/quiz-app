import { Button } from 'antd';
import cn from 'classnames';
import Loading from 'components/Loading/Loading';
import QuestionCard from 'components/QuestionCard/QuestionCard';
import Timer from 'components/Timer/Timer';
import Up from 'components/Up/Up';
import { countScore, scrollToTop } from 'helpers/quiz';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { IAnswers } from 'interfaces/answers.interface';
import { GameContext } from 'modules/Game/context/Game.context';
import { FC, useContext, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './QuestionsForm.module.scss';

/**
 * Компонент форма вопросов
 * @param isLastPage boolean если страница последняя то true
 * @param questionsDivRef ref блока вопросов
 * @returns форму вопросов
 */
const QuestionsForm: FC = () => {
	const { changeStatus, changeScore } = useActions();
	const { questions, answers, status, loadingQuestions } = useAppSelector(
		state => state.quizReducer
	);
	const {
		isLastPage,
		questionsDivRef,
		setStartAt,
		isCounted,
		timeInSec,
		countDownInSec
	} = useContext(GameContext);
	const { control, handleSubmit, getValues } = useForm<IAnswers>();

	const formRef = useRef<HTMLFormElement>();

	// подсчет ответов и изменение статуса
	const result = (data: IAnswers) => {
		const score = countScore(answers, data);
		changeScore(score);
		changeStatus('finish');
		scrollToTop(questionsDivRef);
	};

	useEffect(() => {
		if (status === 'play') {
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
							<Button type='primary' htmlType='submit'>
								Завершить игру
							</Button>
						)}
					</div>
				)}
				<Up questionsDivRef={questionsDivRef} />
			</form>
			<Timer time={timeInSec} countDown={countDownInSec} />
		</>
	);
};

export default QuestionsForm;
