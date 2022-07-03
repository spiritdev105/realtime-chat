import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '',
    userLoading: false,
    userSuccess: false,
    userError: false,
    userMessage: ''
}

//login user
export const userLogin = createAsyncThunk(
    'authSlice/login',
    async (userData, thunkApi) => {
        try {
            return await authService.loginUser('/auth/login', userData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authReset: (state) => {
            state.userMessage = ''
            state.userLoading = false
            state.userSuccess = false
            state.userError = false
        },
        logout: (state) => {
            state.user = ''
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.userLoading = true
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.userLoading = false
                state.userSuccess = true
                state.user = action.payload
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.userLoading = false
                state.userError = true
                state.userMessage = action.payload
            })
    }
})

export const { authReset, logout } = authSlice.actions
export default authSlice.reducer