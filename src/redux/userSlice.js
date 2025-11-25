import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  monthlyBudget: 0,
  categoricalBudget: {
    food: 0,
    travel: 0,
    entertainment: 0,
    other: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.name = action.payload;
    },
    updateMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
    updateCategoricalBudget: (state, action) => {
      state.categoricalBudget = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
