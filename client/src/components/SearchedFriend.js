import Avatar from './Avatar'
import axios from '../axiosConfig'
import { toast } from 'react-toastify'
import { newRequest } from '../slices/requestSlice'
import { useDispatch, useSelector } from 'react-redux'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

export default function SearchedFriend({ friend, user, added, sent }) {
    const dispatch = useDispatch()
    const { socket } = useSelector(state => state.socketConfig)

    async function makeRequest() {
        const reqData = {
            receiverId: friend._id,
            senderId: user._id,
            senderUsername: user.username,
            senderImage: user.imageUrl ? user.imageUrl : ''
        }

        try {
            const res = await axios.post(`/request/${user._id}`, reqData)
            dispatch(newRequest(res.data.newRequest))
            socket && socket.emit('sendRequest', res.data.newRequest)
            toast(res.data.message, { type: 'success', autoClose: 2500 })
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            toast(message, { type: 'error', autoClose: 2500 })
        }
    }

    return (
        <div className="pt-6 px-6 flex justify-between">
            <div className="info flex gap-6 items-center">
                <Avatar image={friend.imageUrl ? friend.imageUrl : defaultImage} customStyle="w-14 h-14" />
                <div className="content">
                    <h3 className="text-2xl text-gray-200 font-medium">{friend.username}</h3>
                    <p className="capitalize text-lg text-gray-500">{added ? 'Already added' : sent ? 'Sent request' : 'New Friend'}</p>
                </div>
            </div>

            <button onClick={makeRequest} className={`${added || sent ? 'text-blue-500 outline-1 outline outline-blue-500 px-10 pointer-events-none' : 'text-gray-300 transition-all hover:bg-blue-600 bg-blue-500 px-12'} py-3 text-center text-2xl font-medium rounded-md`}>{added ? 'Added' : sent ? 'Sent' : 'Send'}</button>
        </div>
    )
}
