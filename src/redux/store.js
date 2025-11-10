import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../redux/quizSlice";
import userReducer from "../redux/userSlice";


export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    user: userReducer,
   
  },
});
