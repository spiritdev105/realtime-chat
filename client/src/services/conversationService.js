import axios from '../axiosConfig'

async function createConversation(url, data) {
    const res = await axios.post(url, data)
    return res.data
}

const conversationService = { createConversation }
export default conversationService