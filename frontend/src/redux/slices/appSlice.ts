import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state structure
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
};

// Create the slice with reducers
const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    // Action to update the current user
    currentUser(state, action: PayloadAction<{ username?: string; email?: string; savedCodes?: string[] }>) {
      state.currentUser = action.payload;
    },
    // Action to update the login state
    isLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

// Export the action creators
export const { currentUser, isLoggedIn } = appSlice.actions;

// Export the reducer
export default appSlice.reducer;
