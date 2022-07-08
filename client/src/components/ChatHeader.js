import { LogoutIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteConversation } from '../slices/conversationSlice'
import Avatar from './Avatar'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

export default function ChatHeader() {
    const { username } = useParams()
    const { allUsers } = useSelector(state => state.users)
    const receiver = allUsers.find(u => u.username === username)
    const { conversations } = useSelector(state => state.conversation)
    const conversation = conversations.find(c => c.members.some(m => m.memberUsername === username))
    const dispatch = useDispatch()

    function removeFriend() {
        dispatch(deleteConversation(conversation._id))
    }

    return (
        <header className="absolute top-0 left-0 w-full py-8 px-20 bg-gray-900 flex justify-between items-center">
            <div className="flex items-center gap-6">
                <div className="flex gap-4 items-center">
                    <Avatar image={receiver?.imageUrl ? receiver.imageUrl : defaultImage} customStyle="w-12 h-12" />
                    <p className="capitalize text-gray-300 text-2xl">{username}</p>
                </div>

                <p className="text-gray-600 text-lg ">Where we can share our works and feedback</p>
            </div>

            {/* <div className="members flex items-center gap-2"> */}
            {/* <Avatar image={defaultImage} customStyle="w-9 h-9" />
                <Avatar image={defaultImage} customStyle="w-9 h-9" />
                <Avatar image={defaultImage} customStyle="w-9 h-9" /> */}
            {/* <div className="w-9 h-9 bg-gray-800 rounded-xl text-gray-400 text-base flex items-center justify-center">24</div> */}
            <div onClick={removeFriend} className="w-9 h-9 bg-gray-700 rounded-xl text-base flex items-center justify-center">
                <LogoutIcon className="w-6 h-6 fill-gray-300 cursor-pointer" />
            </div>
            {/* </div> */}
        </header>
    )
}
