import axios from '../axiosConfig'

async function createMsg(url, data) {
    const res = await axios.post(url, data)
    return res.data
}

const messageService = { createMsg }
export default messageService