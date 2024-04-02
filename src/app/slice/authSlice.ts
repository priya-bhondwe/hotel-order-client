import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import User from "../../shared/models/UserModels";

// initialState  is object  that's way we declear type
const initialState: User = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, { payload }) => payload,
  },
});

export const { addUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth;
export default authSlice.reducer;
