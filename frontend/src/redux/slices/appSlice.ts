import { createSlice } from "@reduxjs/toolkit";

export interface appSliceState {
  currentUser: {
    username?: string;
    email?: string;
    savedCodes?: string[];
  };
  isLoggedIn: boolean;
}
const initialState: appSliceState = {
    currentUser: {},
    isLoggedIn: false,
}

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
