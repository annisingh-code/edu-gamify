import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../redux/quizSlice";
import userReducer from "../redux/userSlice";
// import leaderboardReducer from "../redux/leaderboardSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    user: userReducer,
    // leaderboard: leaderboardReducer,
  },
});
