import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import requestService from '../services/requestService'

const initialState = {
    requests: [],
    requestLoading: false,
    requestSuccess: false,
    requestError: false,
    requestMessage: ''
}

//all requests
export const allRequests = createAsyncThunk(
    'requestSlice/all',
    async (_, thunkApi) => {
        try {
            const userId = thunkApi.getState().auth.user._id
            return await requestService.allRequests(`/request/${userId}`)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        requestReset: (state) => {
            state.requestError = false
            state.requestLoading = false
            state.requestSuccess = false
            state.requestMessage = ''
        },
        newRequest: (state, action) => {
            state.requests = [...state.requests, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(allRequests.pending, (state) => {
                state.requestLoading = true
            })
            .addCase(allRequests.fulfilled, (state, action) => {
                state.requestLoading = false
                state.requests = action.payload
            })
    }
})

export const { requestReset, newRequest } = requestSlice.actions
export default requestSlice.reducer