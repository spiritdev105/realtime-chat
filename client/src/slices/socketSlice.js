import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    socket: null,
    allActiveUsers: []
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload
        },
        setActiveUsers: (state, action) => {
            state.allActiveUsers = action.payload
        }
    }
})

export const { setSocket, setActiveUsers } = socketSlice.actions
export default socketSlice.reducer