import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "hi",
    disabled: true,
    messages: [],
    notificationCount: 0
};

const sendMessageSlice = createSlice({
    name: "sendMessageMethods",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setButtonDisabled: (state, action) => {
            state.disabled = action.payload;
        },
        setNotificationCount: (state, action) => {
            state.notificationCount = action.payload;
        }
    },
});

export const { setMessage , setButtonDisabled, setMessages, setNotificationCount } = sendMessageSlice.actions;

export default sendMessageSlice.reducer;