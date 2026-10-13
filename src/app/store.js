import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userCountReducer from "../features/SignalRMethods/signalRMethodsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userCount: userCountReducer
  },
});