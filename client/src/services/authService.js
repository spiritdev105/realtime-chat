import axios from '../axiosConfig'

async function loginUser(url, data) {
    const res = await axios.post(url, data)
    localStorage.setItem('user', JSON.stringify(res.data))
    return res.data
}

const authService = { loginUser }
export default authService