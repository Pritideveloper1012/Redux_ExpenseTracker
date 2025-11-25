import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [], // {id, name, category, amount}
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        tx => tx.id !== action.payload
      );
    },
    clearTransactions: state => {
      state.transactions = [];
    },
  },
});

export const { addTransaction, deleteTransaction, clearTransactions } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
