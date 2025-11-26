// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import transactionsReducer from "./transactionSlice";
import expenseReducer from "./expenseSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
    expense: expenseReducer,
  },
});

export default store;
