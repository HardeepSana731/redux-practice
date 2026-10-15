import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userCountReducer from "../features/SignalRMethods/signalRMethodsSlice";
import deathlyHallowsReducer from "../features/SignalRMethods/deathlyHallowsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userCount: userCountReducer,
    deathlyHallowsRace: deathlyHallowsReducer
  },
});