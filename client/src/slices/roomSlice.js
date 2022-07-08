import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import roomService from '../services/roomService'

const initialState = {
    rooms: [],
    roomSuccess: false,
    roomError: false,
    roomMessage: ''
}

//get rooms
export const allRooms = createAsyncThunk(
    'roomSlice/all',
    async (_, thunkApi) => {
        try {
            const userId = thunkApi.getState().auth.user._id
            return await roomService.allRooms(`/room/${userId}`)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

//create a room
export const newRoom = createAsyncThunk(
    'roomSlice/new',
    async (roomData, thunkApi) => {
        try {
            const userId = thunkApi.getState().auth.user._id
            return await roomService.createRoom(`/room/${userId}`, roomData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

//join a room
export const joinARoom = createAsyncThunk(
    'roomSlice/join',
    async (roomId, thunkApi) => {
        try {
            const userId = thunkApi.getState().auth.user._id
            return await roomService.joinRoom(`/room/${userId}`, roomId)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        roomReset: (state) => {
            state.roomSuccess = false
            state.roomError = false
            state.roomMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(newRoom.fulfilled, (state, action) => {
                state.rooms = [...state.rooms, action.payload.newRoom]
                state.roomSuccess = true
                state.roomMessage = action.payload.message
            })
            .addCase(newRoom.rejected, (state, action) => {
                state.roomError = true
                state.roomMessage = action.payload
            })
            .addCase(joinARoom.fulfilled, (state, action) => {
                state.rooms = [...state.rooms, action.payload.room]
                state.roomSuccess = true
                state.roomMessage = action.payload.message
            })
            .addCase(joinARoom.rejected, (state, action) => {
                state.roomError = true
                state.roomMessage = action.payload
            })
            .addCase(allRooms.fulfilled, (state, action) => {
                state.rooms = action.payload
            })
    }
})

export const { roomReset } = roomSlice.actions
export default roomSlice.reducer