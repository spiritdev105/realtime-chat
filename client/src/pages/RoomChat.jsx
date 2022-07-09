import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RoomHeader from "../components/RoomHeader"
import Loader from '../components/Loader'
import ErrMsg from "../components/ErrMsg"
import ChatMessage from "../components/ChatMessage"
import RoomInput from "../components/RoomInput"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function RoomChat({ user }) {
    const { roomId } = useParams()
    const { rooms } = useSelector(state => state.room)
    const { messages, messageLoading } = useSelector(state => state.message)
    const chatMessages = messages.filter(m => m.conversationId === roomId)
    const currentRoom = rooms.find(r => r._id === roomId)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if(roomSuccess) toast(roomMessage, {type: 'success', autoClose: 2200})
    // },[roomSuccess, roomError, roomMessage, dispatch])

    return (
        <>
            <RoomHeader currentRoom={currentRoom} user={user} />

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

            <RoomInput user={user} room={currentRoom} />
        </>
    )
}
