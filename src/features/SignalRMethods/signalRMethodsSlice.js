import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalUsers: 0,
  totalViews: 0,
};

const userCountSlice = createSlice({
  name: "signalRMethods",
  initialState,
  reducers: {
    setTotalViews: (state,action) => {
      state.totalViews = action.payload;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
  },
});

export const { setTotalViews, setTotalUsers } = userCountSlice.actions;

export default userCountSlice.reducer;