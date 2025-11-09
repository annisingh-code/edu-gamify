import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  currentIndex: 0,
  score: 0,
  isCompleted: false,
  currentStreak: 0,
  bestStreak: 0,
  userAnswers: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.currentIndex = 0;
      state.score = 0;
      state.isCompleted = false;
      state.currentStreak = 0;
      state.bestStreak = 0;
      state.userAnswers = [];
    },
    answerQuestion: (state, action) => {
      const { isCorrect, answerGiven, timeTaken } = action.payload;
      // Base points = 10, Time bonus = up to 5
      const points = isCorrect ? 10 + Math.max(0, 5 - Math.floor(timeTaken)) : 0;

      if (isCorrect) {
        state.score += points;
        state.currentStreak += 1;
        state.bestStreak = Math.max(state.bestStreak, state.currentStreak);
      } else {
        state.currentStreak = 0;
      }
      state.userAnswers.push({ questionIndex: state.currentIndex, isCorrect, answer: answerGiven, points });
    },
    nextQuestion: (state) => {
       state.currentIndex += 1;
       if (state.currentIndex >= state.questions.length) state.isCompleted = true;
    },
    resetQuiz: () => initialState,
  },
});

export const { setQuestions, answerQuestion, nextQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;