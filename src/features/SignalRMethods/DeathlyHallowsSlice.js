import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cloakCount: 0,
    wandCount: 0,
    stoneCount: 0,
};

const deathlyHallowsSlice = createSlice({
    name: "deathlyHallowsMethods",
    initialState,
    reducers: {
        setCloakCount: (state, action) => {
            state.cloakCount = action.payload;
        },
         setStoneCount: (state, action) => {
            state.stoneCount = action.payload;
        },
         setWandCount: (state, action) => {
            state.wandCount = action.payload;
        },
    },
});

export const { setCloakCount, setStoneCount, setWandCount } = deathlyHallowsSlice.actions;

export default deathlyHallowsSlice.reducer;