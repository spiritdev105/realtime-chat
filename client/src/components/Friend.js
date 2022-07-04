import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import Quantity from './Quantity'

export default function Friend({ yourFriend, total }) {
    return (
        <Link to={`/${yourFriend.memberUsername}`}>
            <div className="flex items-center justify-between rounded-xl cursor-pointer py-2.5 px-3 hover:bg-gray-900">
                <div className="text-gray-300 text-xl flex items-center gap-4">
                    <Avatar image={yourFriend.memberImage} customStyle="w-9 h-9" />
                    {yourFriend.memberUsername}
                </div>

                <div className="flex gap-3 items-center">
                    {total && <Quantity total={total} />}
                    <span className="w-3 h-3 inline-block bg-green-500 rounded-full"></span>
                </div>
            </div>
        </Link>
    )
}
