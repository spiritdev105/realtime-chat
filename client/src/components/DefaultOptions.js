import Quantity from './Quantity'
import { PaperAirplaneIcon, LogoutIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function DefaultOptions({ user }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { requests } = useSelector(state => state.requests)

    const totalRequests = requests.reduce((acc, req) => {
        if (req.receiverId === user._id) return acc + 1
        return acc
    }, 0)

    function logoutUser() {
        dispatch(logout())
        navigate('/login')
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

            <div className="flex items-center justify-between rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900">
                <div className="flex items-center gap-5">
                    <UserGroupIcon className="w-7 h-7 stroke-gray-300" />
                    <p className="text-xl text-gray-300">Join Room</p>
                </div>
            </div>

            <div className="flex items-center justify-between rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900">
                <div className="flex items-center gap-5">
                    <UsersIcon className="w-7 h-7 stroke-gray-300" />
                    <p className="text-xl text-gray-300">Create Room</p>
                </div>
            </div>

            <div className="flex items-center justify-between rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900" onClick={logoutUser}>
                <div className="flex items-center gap-5">
                    <LogoutIcon className="w-7 h-7 stroke-gray-300" />
                    <p className="text-xl text-gray-300">Logout</p>
                </div>
            </div>

        </div>
    )
}
