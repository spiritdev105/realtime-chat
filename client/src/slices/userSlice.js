import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/userService'

const initialState = {
    allUsers: [],
    activeUrl: ''
}

//all users
export const getUsers = createAsyncThunk(
    'usersSlice/all',
    async (_, thunkApi) => {
        try {
            const userId = thunkApi.getState().auth.user._id
            return await userService.allUsers(`/user/${userId}`)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUrl: (state, action) => {
            state.activeUrl = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload
            })
    }
})

export const { setUrl } = usersSlice.actions
export default usersSlice.reducer