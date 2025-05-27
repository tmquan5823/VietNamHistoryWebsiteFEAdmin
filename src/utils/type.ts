export interface ResponseData<T> {
  status?: number;
  message: string;
  data: T;
}

export interface AnswerChecked {
  is_correct: boolean;
  score: number;
  funfact: string;
  correct_answer: string[];
}

export interface AnswerCheck {
  number: number,
  answer: string[],
  score: number,
  time_taken?: number,
  is_multi_answer?: boolean;
  is_end_time?: boolean
}