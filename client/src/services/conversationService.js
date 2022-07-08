import axios from '../axiosConfig'

async function createConversation(url, data) {
    const res = await axios.post(url, data)
    return res.data
}

async function allConversations(url) {
    const res = await axios.get(url)
    return res.data
}

async function deleteConversation(url) {
    const res = await axios.delete(url)
    return res.data
}

const conversationService = { createConversation, allConversations, deleteConversation }
export default conversationService