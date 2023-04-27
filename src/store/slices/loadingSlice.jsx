import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    value: false,
  },
  reducers: {
    setLoadingState(state, action) {
      state.value = !state.value;
    }
  }
})

export const {setLoadingState} = loadingSlice.actions;

export const selectLoading = (state) => {
  return state.loadingState.value;
}

export default loadingSlice.reducer;