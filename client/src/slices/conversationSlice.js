import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import conversationService from '../services/conversationService'

const initialState = {
    conversations: [],
    conversationSuccess: false,
    conversationError: false,
    conversationMessage: ''
}

//create a conversation
export const newConversation = createAsyncThunk(
    'conversationSlice/new',
    async (data, thunkApi) => {
        try {
            const userId = thunkApi.getState().auth.user._id
            return await conversationService.createConversation(`/conversation/${userId}`, data)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

//all conversations
export const allConversations = createAsyncThunk(
    'conversationSlice/all',
    async (_, thunkApi) => {
        try {
            const userId = thunkApi.getState().auth.user._id
            return await conversationService.allConversations(`/conversation/${userId}`)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        resetConversation: (state) => {
            state.conversationSuccess = false
            state.conversationError = false
            state.conversationMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(newConversation.fulfilled, (state, action) => {
                state.conversations = [...state.conversations, action.payload]
                state.conversationSuccess = true
            })
            .addCase(newConversation.rejected, (state, action) => {
                state.conversationError = true
                state.conversationMessage = action.payload
            })
            .addCase(allConversations.fulfilled, (state, action) => {
                state.conversations = action.payload
            })
    }
})

export const { resetConversation } = conversationSlice.actions
export default conversationSlice.reducer