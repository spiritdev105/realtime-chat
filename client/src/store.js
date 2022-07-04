import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import usersReducer from './slices/userSlice'
import requestsReducer from './slices/requestSlice'
import conversationReducer from './slices/conversationSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        requests: requestsReducer,
        conversation: conversationReducer
    }
})

export default store