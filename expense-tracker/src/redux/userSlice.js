import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  totalBudget: 0,
  categories: {
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
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setBudget: (state, action) => {
      state.totalBudget = action.payload;
    },
    setCategoryBudget: (state, action) => {
      const { category, amount } = action.payload;
      state.categories[category] = amount;
    },
    resetUser: () => initialState,
  },
});

export const { setUserName, setBudget, setCategoryBudget, resetUser } =
  userSlice.actions;

export default userSlice.reducer;
