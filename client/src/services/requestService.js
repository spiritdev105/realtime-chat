import axios from "../axiosConfig"

async function allRequests(url) {
    const res = await axios.get(url)
    return res.data
}

async function deleteRequest(url, reqData) {
    const res = await axios.delete(url, { data: { ...reqData } })
    return res.data
}

const requestService = { allRequests, deleteRequest }
export default requestService