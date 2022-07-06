import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatHeader from '../components/ChatHeader'
import ChatInput from '../components/ChatInput'
import ChatMessage from '../components/ChatMessage'
import { toast } from 'react-toastify'
import { msgReset } from '../slices/messageSlice'

export default function ChatBox({ user }) {
    const { messages, currentMessage, messageError, messageSuccess, message } = useSelector(state => state.message)
    const dispatch = useDispatch()

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
                    messages.map(m => (<ChatMessage key={m._id} own={user._id === m.senderId} messageData={m} />))
                }
            </main>

            <ChatInput user={user} />
        </>
    )
}
