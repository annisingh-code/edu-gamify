import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  totalPoints: 0,
  xp: 0,
  level: 1,
  badges: [],
  quizHistory: [], //  To store past quiz results for AI
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addPoints: (state, action) => {
      state.totalPoints += action.payload;
      state.xp += action.payload;
      state.level = Math.floor(Math.sqrt(state.xp / 100)) + 1;
    },
    completeQuiz: (state, action) => {
      const { quizId, score, maxScore, category, difficulty } = action.payload;
      state.quizHistory.push({
        quizId,
        score,
        maxScore,
        category,
        difficulty,
        date: new Date().toISOString(),
      });
    },
    setBadgeType: (state, action) => {
      const percentage = action.payload;
      let badge = null;
      if (percentage >= 80)
        badge = { id: "gold", name: "Gold Medal", icon: "🥇" };
      else if (percentage >= 50)
        badge = { id: "silver", name: "Silver Medal", icon: "🥈" };
      else badge = { id: "bronze", name: "Bronze Medal", icon: "🥉" };

      if (badge && !state.badges.find((b) => b.id === badge.id)) {
        state.badges.push({ ...badge, unlockedAt: new Date().toISOString() });
      }
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setError,
  addPoints,
  completeQuiz,
  setBadgeType,
} = userSlice.actions;
export default userSlice.reducer;
