import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: null,
};

export const accountSlice = createSlice({
   name: "account",
   initialState,
   reducers: {
      login: (state, action) => {
         state.user = action.payload;
      },
      logout: (state) => {
         state.user = null;
      },
   },
});

export const selectUser = (state) => state.account.user;

export const { login, logout } = accountSlice.actions;

export default accountSlice.reducer;
