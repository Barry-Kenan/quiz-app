export interface QuizState {
	count: number;
}

export enum QuizActionEnum {
	CHANGE_SCORE = 'CHANGE_SCORE'
}

export interface ChangeScoreAction {
	type: QuizActionEnum.CHANGE_SCORE;
	payload: number;
}

export type QuizAction = ChangeScoreAction;
