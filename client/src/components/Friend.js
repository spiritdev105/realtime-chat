import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import Quantity from './Quantity'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

export default function Friend({ yourFriend, total, activeUrl, active }) {
    return (
        <Link to={`/${yourFriend.memberUsername}`}>
            <div className={`flex items-center justify-between rounded-xl cursor-pointer py-2.5 px-3 hover:bg-gray-900 ${activeUrl === yourFriend.memberUsername ? 'bg-gray-900' : ''}`}>
                <div className="text-gray-300 text-xl flex items-center gap-4">
                    <Avatar image={yourFriend.memberImage ? yourFriend.memberImage : defaultImage} customStyle="w-9 h-9" />
                    {yourFriend.memberUsername}
                </div>

                <div className="flex gap-3 items-center">
                    {total && <Quantity total={total} />}
                    <span className={`w-3 h-3 inline-block ${active ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></span>
                </div>
            </div>
        </Link>
    )
}
