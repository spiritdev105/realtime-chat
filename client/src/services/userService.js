import axios from '../axiosConfig'

async function allUsers(url) {
    const res = await axios.get(url)
    return res.data
}

const usersService = { allUsers }
export default usersService