import { createSlice } from "@reduxjs/toolkit";
import loadingSlice from "./loadingSlice";

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {

  },
  reducers: {

  }
})

export const {} = userInfoSlice.actions;

export const selectUserInfo = (state) => {
  return state.userInfoState.value;
}

export default loadingSlice.reducer