import { useEffect } from 'react'
import Quantity from './Quantity'
import { PaperAirplaneIcon, LogoutIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { joinARoom, newRoom, roomReset } from '../slices/roomSlice';
import { toast } from 'react-toastify'

export default function DefaultOptions({ user, activeUrl }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { requests } = useSelector(state => state.requests)
    const { rooms, roomSuccess, roomError, roomMessage, currentRoomId } = useSelector(state => state.room)
    const { socket } = useSelector(state => state.socketConfig)

    useEffect(() => {
        if (!socket || !currentRoomId) return
        const room = rooms.find(r => r._id === currentRoomId)
        socket.emit('sendRoom', room, `${user.username} joined the ${room.roomName} channel`)
    }, [socket, currentRoomId, rooms, user])

    useEffect(() => {
        if (roomSuccess) {
            navigate(`/room/${currentRoomId}`)
            toast(roomMessage, { type: 'success', autoClose: 2500 })
        }
        if (roomError) toast(roomMessage, { type: 'error', autoClose: 2500 })
        if (roomSuccess || roomError) dispatch(roomReset())
    }, [roomSuccess, roomError, roomMessage, dispatch, currentRoomId, navigate])

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

            {/* <Link to="/requests"> */}
            <div onPointerDown={() => navigate('/requests')} className={`flex items-center justify-between rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900 ${activeUrl === '/requests' ? 'bg-gray-900' : ''}`}>
                <div className="flex items-center gap-5">
                    <PaperAirplaneIcon className="w-7 h-7 stroke-gray-300" />
                    <p className="text-xl text-gray-300">Requests</p>
                </div>
                {
                    totalRequests ? <Quantity total={totalRequests} /> : ''
                }
            </div>
            {/* </Link> */}

            <div className="flex items-center gap-5 rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900" onPointerDown={joinRoom}>
                <UserGroupIcon className="w-7 h-7 stroke-gray-300" />
                <p className="text-xl text-gray-300">Join Room</p>
            </div>

            <div className="flex items-center gap-5 rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900" onPointerDown={createRoom}>
                <UsersIcon className="w-7 h-7 stroke-gray-300" />
                <p className="text-xl text-gray-300">Create Room</p>
            </div>

            <div className="flex items-center gap-5 rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900" onPointerDown={logoutUser}>
                <LogoutIcon className="w-7 h-7 stroke-gray-300" />
                <p className="text-xl text-gray-300">Logout</p>
            </div>

        </div>
    )
}
