// src/redux/transactionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [], // {id, name, category, amount}
};

const transactionSlice = createSlice({
  name: "transactions", // matches test
  initialState,
  reducers: {
    addTransactionEntry: (state, action) => {
      state.transactions.push(action.payload);
    },
    removeTransactionEntry: (state, action) => {
      state.transactions = state.transactions.filter(
        (tx) => tx.id !== action.payload
      );
    },
    removeAllTransactions: (state) => {
      state.transactions = [];
    },
  },
});

export const {
  addTransactionEntry,
  removeTransactionEntry,
  removeAllTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
