import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import usersReducer from './slices/userSlice'
import requestsReducer from './slices/requestSlice'
import conversationReducer from './slices/conversationSlice'
import messageReducer from './slices/messageSlice'
import roomReducer from './slices/roomSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        requests: requestsReducer,
        conversation: conversationReducer,
        message: messageReducer,
        room: roomReducer
    }
})

export default store