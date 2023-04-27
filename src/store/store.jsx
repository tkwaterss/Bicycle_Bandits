import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loadingSlice";

//export store and reducers
export default configureStore({
  reducer: {
    loadingState: loadingReducer,
  },
});
