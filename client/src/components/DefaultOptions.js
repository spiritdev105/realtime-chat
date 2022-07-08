import { useEffect } from 'react'
import Quantity from './Quantity'
import { PaperAirplaneIcon, LogoutIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { joinARoom, newRoom, roomReset } from '../slices/roomSlice';
import { toast } from 'react-toastify'

export default function DefaultOptions({ user }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { requests } = useSelector(state => state.requests)
    const { roomSuccess, roomError, roomMessage } = useSelector(state => state.room)

    useEffect(() => {
        if (roomSuccess) {
            //navigate to room (will do it later)
            toast(roomMessage, { type: 'success', autoClose: 2500 })
        }
        if (roomError) toast(roomMessage, { type: 'error', autoClose: 2500 })
        if (roomSuccess || roomError) dispatch(roomReset())
    }, [roomSuccess, roomError, roomMessage, dispatch])

    const totalRequests = requests.reduce((acc, req) => {
        if (req.receiverId === user._id) return acc + 1
        return acc
    }, 0)

    function logoutUser() {
        dispatch(logout())
        navigate('/login')
    }

    function createRoom() {
        const roomName = window.prompt('Enter the room name: ')
        if (!roomName) return

        const roomData = {
            members: [user._id],
            roomName
        }

        dispatch(newRoom(roomData))
    }

    function joinRoom() {
        const roomId = window.prompt('Enter room ID: ')
        if (!roomId) return
        dispatch(joinARoom(roomId))
    }

    return (
        <div className="py-8">

            <Link to="/requests">
                <div className="flex items-center justify-between rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900">
                    <div className="flex items-center gap-5">
                        <PaperAirplaneIcon className="w-7 h-7 stroke-gray-300" />
                        <p className="text-xl text-gray-300">Requests</p>
                    </div>
                    {
                        totalRequests ? <Quantity total={totalRequests} /> : ''
                    }
                </div>
            </Link>

            <div className="flex items-center gap-5 rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900" onClick={joinRoom}>
                <UserGroupIcon className="w-7 h-7 stroke-gray-300" />
                <p className="text-xl text-gray-300">Join Room</p>
            </div>

            <div className="flex items-center gap-5 rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900" onClick={createRoom}>
                <UsersIcon className="w-7 h-7 stroke-gray-300" />
                <p className="text-xl text-gray-300">Create Room</p>
            </div>

            <div className="flex items-center gap-5 rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900" onClick={logoutUser}>
                <LogoutIcon className="w-7 h-7 stroke-gray-300" />
                <p className="text-xl text-gray-300">Logout</p>
            </div>

        </div>
    )
}
