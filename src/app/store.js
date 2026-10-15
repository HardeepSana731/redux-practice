import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userCountReducer from "../features/SignalRMethods/signalRMethodsSlice";
import deathlyHallowsReducer from "../features/SignalRMethods/DeathlyHallowsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userCount: userCountReducer,
    deathlyHallowsRace: deathlyHallowsReducer
  },
});