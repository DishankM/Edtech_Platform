import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  loading: false,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      // keep token in localStorage
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setLoading, setSignupData, logout } =
  authSlice.actions;

export default authSlice.reducer;
