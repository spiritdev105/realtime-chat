import axios from "../axiosConfig"

async function allRequests(url) {
    const res = await axios.get(url)
    return res.data
}

const requestService = { allRequests }
export default requestService