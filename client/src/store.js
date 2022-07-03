import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import usersReducer from './slices/userSlice'
import requestsReducer from './slices/requestSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        requests: requestsReducer
    }
})

export default store