import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    clearUser: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setError } = userSlice.actions;

export default userSlice.reducer;
