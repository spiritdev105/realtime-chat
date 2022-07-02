import axios from 'axios'

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        Authorization: user ? `Bearer ${user.token}` : null
    }
})

export default axiosInstance