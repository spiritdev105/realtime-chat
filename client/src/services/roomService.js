import axios from '../axiosConfig'

async function createRoom(url, data) {
    const res = await axios.post(url, data)
    return res.data
}

async function joinRoom(url, roomId) {
    const res = await axios.put(url, { roomId })
    return res.data
}

async function allRooms(url) {
    const res = await axios.get(url)
    return res.data
}

async function leaveRoom(url) {
    const res = await axios.delete(url)
    return res.data
}

const roomService = { createRoom, joinRoom, allRooms, leaveRoom }
export default roomService