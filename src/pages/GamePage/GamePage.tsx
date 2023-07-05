import { Button } from 'antd';
import { QuestionCard } from 'components';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './GamePage.module.scss';

const GamePage: FC = () => {
	const { questions: q } = useAppSelector(state => state.quizReducer);

	const { control, handleSubmit } = useForm();

	const onSubmit = (formData: any) => {
		console.log(formData);
	};

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{q.map((e, id) => (
					<Controller
						key={id}
						control={control}
						name={'question' + (id + 1)}
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
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default GamePage;
