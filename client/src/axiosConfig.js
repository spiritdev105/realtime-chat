import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://realtime-mern-chat.herokuapp.com/api",
    withCredentials: true,
})

axiosInstance.interceptors.request.use((req) => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    req.headers.Authorization = user ? `Bearer ${user.token}` : ''
    return req
})

export default axiosInstance