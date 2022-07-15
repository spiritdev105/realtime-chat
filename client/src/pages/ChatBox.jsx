import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatHeader from '../components/ChatHeader'
import ChatInput from '../components/ChatInput'
import ChatMessage from '../components/ChatMessage'
import { toast } from 'react-toastify'
import { msgReset, newMsgReset } from '../slices/messageSlice'
import { useNavigate, useParams } from 'react-router-dom'
import ErrMsg from '../components/ErrMsg'
import Loader from '../components/Loader'
import { resetConversation, rmConversationReset } from '../slices/conversationSlice'
import { setUrl } from '../slices/userSlice'

export default function ChatBox({ user }) {
    const { messages, messageError, messageSuccess, message, messageLoading, newMsg } = useSelector(state => state.message)
    const dispatch = useDispatch()
    const { username } = useParams()
    const { conversations, conversationSuccess, conversationError, conversationMessage, removeConversation } = useSelector(state => state.conversation)
    const conversation = conversations.find(c => c.members.some(m => m.memberUsername === username))
    const chatMessages = messages.filter(m => m.conversationId === conversation?._id)
    const navigate = useNavigate()
    const { socket } = useSelector(state => state.socketConfig)

    useEffect(() => {
        if (!socket || !newMsg) return
        const friend = conversation.members.find(m => m.memberId !== user._id)
        const friendId = friend.memberId
        socket.emit('sendPrivateMsg', newMsg, friendId)
        dispatch(newMsgReset())
    }, [socket, newMsg, dispatch])

    useEffect(() => {
        if (!socket || !removeConversation) return
        socket.emit('sendRmConversation', { rmMsg: `${user.username} blocked you`, ...removeConversation, removerId: user._id })
        dispatch(rmConversationReset())
    }, [socket, removeConversation, user, dispatch, conversation])

    useEffect(() => {
        if (messageSuccess) {
            return
        }
        if (messageError) toast(message, { type: 'error', autoClose: 2200 })
        if (messageSuccess || messageError) dispatch(msgReset())
    }, [messageError, messageSuccess, message, dispatch])

    useEffect(() => {
        if (conversationSuccess) {
            toast(conversationMessage, { type: 'success', autoClose: 2200 })
            navigate('/')
        }
        if (conversationError) toast(conversationMessage, { type: 'error', autoClose: 2200 })
        if (conversationSuccess || conversationError) dispatch(resetConversation())
    }, [conversationError, conversationSuccess, conversationMessage, dispatch, navigate])

    useEffect(() => {
        dispatch(setUrl(username))
    }, [username, dispatch])

    return (
        <>
            {conversation ? (
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

                    <ChatInput user={user} conversation={conversation} />
                </>
            ) : (
                <div className="py-10">
                    <ErrMsg errMsg="Unknown friend" />
                </div>
            )
            }
        </>
    )
}
