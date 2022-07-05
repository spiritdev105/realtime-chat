import { PaperAirplaneIcon } from '@heroicons/react/solid'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newMessage } from '../slices/messageSlice'
import { useParams } from 'react-router-dom'

export default function ChatInput({ user }) {
    const inputRef = useRef()
    const dispatch = useDispatch()
    const { username } = useParams()
    const { conversations } = useSelector(state => state.conversation)
    const conversation = conversations.find(c => c.members.some(m => m.memberUsername === username))

    function sendMessage(e) {
        e.preventDefault()

        const inputValue = inputRef.current.value
        if (!inputValue) return

        const data = {
            conversationId: conversation._id,
            senderId: user._id,
            text: inputValue
        }
        dispatch(newMessage(data))
        inputRef.current.value = ''
    }

    return (
        <div className="py-8 px-20 absolute bottom-0 left-0 w-full bg-gray-900">
            <form className="bg-gray-700 flex gap-5 py-4 px-6 items-center rounded-xl">
                <input ref={inputRef} type="text" placeholder="Message in Design Supports" className="w-full bg-transparent text-xl text-gray-400" />
                <button onClick={sendMessage} type="submit"><PaperAirplaneIcon className="fill-gray-300 w-7 h-7 rotate-45 cursor-pointer" /></button>
            </form>
        </div>
    )
}
