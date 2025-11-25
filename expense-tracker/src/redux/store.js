import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import expenseReducer from "./expenseSlice";
import transactionReducer from "./transactionsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    expenses: expenseReducer,
    transactions: transactionReducer,
  },
});

export default store;
