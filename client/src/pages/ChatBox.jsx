import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatHeader from '../components/ChatHeader'
import ChatInput from '../components/ChatInput'
import ChatMessage from '../components/ChatMessage'
import { toast } from 'react-toastify'
import { msgReset } from '../slices/messageSlice'
import { useParams } from 'react-router-dom'
import ErrMsg from '../components/ErrMsg'
import Loader from '../components/Loader'

export default function ChatBox({ user }) {
    const { messages, currentMessage, messageError, messageSuccess, message, messageLoading } = useSelector(state => state.message)
    const dispatch = useDispatch()
    const { username } = useParams()
    const { conversations } = useSelector(state => state.conversation)
    const conversation = conversations.find(c => c.members.some(m => m.memberUsername === username))
    const chatMessages = messages.filter(m => m.conversationId === conversation._id)

    useEffect(() => {
        if (messageSuccess) {
            return
        }
        if (messageError) toast(message, { type: 'error', autoClose: 2200 })
        if (messageSuccess || messageError) dispatch(msgReset())
    }, [messageError, messageSuccess, message, dispatch])

    return (
        <>
            <ChatHeader />

            <main className="h-full max-h-full hideScrollBar overflow-scroll pb-28 pt-[7.5rem]">
                {
                    messageLoading ? <Loader />
                        : chatMessages.length ?
                            chatMessages.map(m => (<ChatMessage key={m._id} own={user._id === m.senderId} messageData={m} />))
                            : (
                                <ErrMsg errMsg="No messages yet" />
                            )
                }
            </main>

            <ChatInput user={user} />
        </>
    )
}
