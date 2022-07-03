import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

axiosInstance.interceptors.request.use((req) => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    req.headers.Authorization = user ? `Bearer ${user.token}` : null
    return req
})

export default axiosInstance