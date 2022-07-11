import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import messageService from '../services/messageService'

const initialState = {
    messages: [],
    message: '',
    messageError: false,
    messageSuccess: false,
    messageLoading: false
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

//all messages
export const allMessages = createAsyncThunk(
    'messageSlice/all',
    async (cid, thunkApi) => {
        try {
            const userId = thunkApi.getState().auth.user._id
            return await messageService.allMsgs(`/message/all/${userId}`, cid)
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
            state.message = ''
            state.messageError = false
            state.messageSuccess = false
            state.messageLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(newMessage.fulfilled, (state, action) => {
                state.messages = [...state.messages, action.payload]
                state.messageSuccess = true
            })
            .addCase(newMessage.rejected, (state, action) => {
                state.messageError = true
                state.message = action.payload
            })
            .addCase(allMessages.pending, (state, action) => {
                state.messageLoading = true
            })
            .addCase(allMessages.fulfilled, (state, action) => {
                state.messages = action.payload
                state.messageLoading = false
            })
            .addCase('conversationSlice/delete/fulfilled', (state, action) => {
                state.messages = state.messages.filter(m => m.conversationId !== action.payload.cid)
            })
            .addCase('auth/logout', (state) => {
                state.messages = []
            })
    }
})

export const { msgReset } = messageSlice.actions
export default messageSlice.reducer