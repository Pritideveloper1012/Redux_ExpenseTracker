// src/redux/expenseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalExpense: 0,
  categoricalExpense: {
    food: 0,
    travel: 0,
    entertainment: 0,
    others: 0, // match test
  },
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    updateTotalExpense: (state, action) => {
      if (action.payload.operation === "add") {
        state.totalExpense += action.payload.amount;
      } else if (action.payload.operation === "subtract") {
        state.totalExpense -= action.payload.amount;
      }
    },
    updateCategoricalExpense: (state, action) => {
      const { category, amount, operation } = action.payload;
      if (operation === "add") {
        state.categoricalExpense[category] += amount;
      } else if (operation === "subtract") {
        state.categoricalExpense[category] -= amount;
      }
    },
    resetAllExpense: () => initialState,
  },
});

export const { updateTotalExpense, updateCategoricalExpense, resetAllExpense } =
  expenseSlice.actions;

export default expenseSlice.reducer;
