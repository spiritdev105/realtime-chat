import axios from '../axiosConfig'

async function createConversation(url, data) {
    const res = await axios.post(url, data)
    return res.data
}

async function allConversations(url) {
    const res = await axios.get(url)
    return res.data
}

const conversationService = { createConversation, allConversations }
export default conversationService