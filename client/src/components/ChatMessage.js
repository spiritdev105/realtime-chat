import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Avatar from './Avatar'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

export default function ChatMessage({ own, messageData }) {
    const { allUsers } = useSelector(state => state.users)
    const sender = allUsers.find(u => u._id === messageData.senderId)
    const node = useRef()

    useEffect(() => {
        node.current.scrollIntoView({ behavior: "smooth" })
    }, [node])

    return (
        <div ref={node} className={`flex ${own ? 'flex-row-reverse' : 'gap-6'} mb-8`}>
            <Avatar image={sender.imageUrl ? sender.imageUrl : defaultImage} customStyle="w-12 h-12" />
            <div className="message">
                <h3 className={`message text-xl text-gray-400 font-medium flex ${own && 'flex-row-reverse mr-6'} items-end gap-4`}>{sender.username} <span className="text-sm text-gray-600">{new Date(messageData.createdAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span></h3>
                <div className={`py-3 px-5 max-w-[50rem] ${own ? 'rounded-tl-full bg-blue-500 mr-2' : 'rounded-tr-full bg-gray-700'} rounded-b-full mt-2 text-xl text-gray-300`}>
                    {messageData.text}
                </div>
            </div>
        </div>
    )
}
