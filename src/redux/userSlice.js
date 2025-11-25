import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  monthlyBudget: "",
  categoricalBudget: {
    food: "",
    travel: "",
    entertainment: "",
    others: "",
  },
  activeFilter: "all",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    updateMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
    updateCategoricalBudget: (state, action) => {
      state.categoricalBudget = { ...state.categoricalBudget, ...action.payload };
    },
    updateActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    resetAllBudget: () => initialState,
  },
});

export const {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
  updateActiveFilter,
  resetAllBudget,
} = userSlice.actions;

export default userSlice.reducer;
