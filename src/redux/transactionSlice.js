import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionList: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransactionEntry: (state, action) => {
      state.transactionList.push(action.payload);
    },

    removeTransactionEntry: (state, action) => {
      state.transactionList = state.transactionList.filter(
        (t) => t.id !== action.payload
      );
    },

    removeAllTransactions: (state) => {
      state.transactionList = [];
    },
  },
});

export const {
  addTransactionEntry,
  removeTransactionEntry,
  removeAllTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
