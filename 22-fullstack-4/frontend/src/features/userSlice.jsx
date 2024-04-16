import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const setLoginUser = createAsyncThunk(
  "user/setLoginUser",
  async (data) => {
    try {
      const response = await axios.post("/api/users/login", data);
      return response.data;
    } catch (error) {
      const dta = JSON.parse(error.request.response);
      throw new Error(dta.errors[0] ? dta.errors[0] : error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login process
      .addCase(setLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setLoginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
