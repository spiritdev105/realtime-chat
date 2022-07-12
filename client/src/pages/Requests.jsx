import { useSelector, useDispatch } from "react-redux";
import ErrMsg from "../components/ErrMsg";
import RequestFriend from "../components/RequestFriend";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import { requestReset } from '../slices/requestSlice'
import { useLocation } from "react-router-dom";
import { setUrl } from "../slices/userSlice";

export default function Requests({ user }) {
    const { requests, requestMessage, requestError, requestSuccess } = useSelector(state => state.requests)
    const yourRequests = requests.filter(req => req.receiverId === user._id)
    const dispatch = useDispatch()
    const location = useLocation()
    const { acceptConversation } = useSelector(state => state.conversation)
    const { deleteRequest } = useSelector(state => state.requests)
    const { socket } = useSelector(state => state.socketConfig)

    useEffect(() => {
        if (!socket || !acceptConversation) return
        socket.emit('sendConversation', acceptConversation)
    }, [socket, acceptConversation])

    useEffect(() => {
        if (!socket || !deleteRequest) return
        socket.emit('sendDeletedRequest', deleteRequest)
    }, [socket, deleteRequest])

    useEffect(() => {
        dispatch(setUrl(location.pathname))
    }, [dispatch, location])

    useEffect(() => {
        if (requestSuccess) toast(requestMessage, { type: 'success', autoClose: 2200 })
        if (requestError) toast(requestMessage, { type: 'error', autoClose: 2200 })
        if (requestSuccess || requestError) dispatch(requestReset())
    }, [requestMessage, requestError, requestSuccess, dispatch])

    return (
        <>
            <h1 className="text-gray-200 text-3xl font-semibold py-10">Requests - {yourRequests.length}</h1>

            <div className="requestedFriends">
                {
                    yourRequests.length ? yourRequests.map(req => (
                        <RequestFriend key={req._id} request={req} user={user} />
                    ))
                        : (
                            <ErrMsg errMsg="no requests found" />
                        )
                }
            </div>
        </>
    )
}
