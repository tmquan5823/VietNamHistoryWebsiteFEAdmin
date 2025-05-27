import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizSetForPlay } from '@/dataHelper/quizSet.dataHelper';
import { RootState } from "@/store";

const initialState: QuizSetForPlay = {
  id: 0,
  title: "",
  description: "",
  topics: [],
  image: "",
  createdAt: "",
  questionCount: 0,
  creator: { id: 0, fullname: "", email: "", avatar: "" },
  questions: [],
};

const quizPlaySlice = createSlice({
  name: 'quizPlay',
  initialState,
  reducers: {
    setQuiz(state, action: PayloadAction<Partial<Omit<QuizSetForPlay, 'questions'>>>) {
      Object.assign(state, action.payload);
    },
    setQuestions(state, action: PayloadAction<QuizSetForPlay['questions']>) {
      state.questions = action.payload;
    },
    resetQuiz: () => initialState,
  },
});

export const { setQuiz, setQuestions, resetQuiz } = quizPlaySlice.actions;
export default quizPlaySlice.reducer;

export const selectQuizPlayQuestionByNumber = (state: RootState, number: number) =>
  state.quiz.questions.find((q) => q.number === number);
