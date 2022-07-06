import axios from '../axiosConfig'

async function createMsg(url, data) {
    const res = await axios.post(url, data)
    return res.data
}

async function allMsgs(url, data) {
    const res = await axios.post(url, data)
    return res.data
}

const messageService = { createMsg, allMsgs }
export default messageService