import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import messageService from '../services/messageService'

const initialState = {
    messages: [],
    currentMessage: '',
    message: '',
    messageError: false,
    messageSuccess: false
}

// create new message
export const newMessage = createAsyncThunk(
    'messageSlice/new',
    async (msgData, thunkApi) => {
        try {
            const userId = thunkApi.getState().auth.user._id
            return await messageService.createMsg(`/message/${userId}`, msgData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        msgReset: (state) => {
            state.currentMessage = ''
            state.message = ''
            state.messageError = false
            state.messageSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(newMessage.fulfilled, (state, action) => {
                state.currentMessage = action.payload
                state.messages = [...state.messages, action.payload]
                state.messageSuccess = true
            })
            .addCase(newMessage.rejected, (state, action) => {
                state.messageError = true
                state.message = action.payload
            })
    }
})

export const { msgReset } = messageSlice.actions
export default messageSlice.reducer