import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    messages: [],
    messageError: false,
    message: ''
}

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => { }
})

export default messageSlice.reducer