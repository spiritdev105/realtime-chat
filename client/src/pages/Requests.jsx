import { useSelector, useDispatch } from "react-redux";
import ErrMsg from "../components/ErrMsg";
import RequestFriend from "../components/RequestFriend";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import { requestReset, requestDeleteReset } from '../slices/requestSlice'
import { useLocation } from "react-router-dom";
import { setMenuSidebar, setProfileSidebar, setServerSidebar, setUrl } from "../slices/userSlice";
import { addConversationReset } from "../slices/conversationSlice";
import { MenuAlt3Icon, MenuIcon, UserIcon } from "@heroicons/react/solid";

export default function Requests({ user }) {
    const { requests, requestMessage, requestError, requestSuccess } = useSelector(state => state.requests)
    const yourRequests = requests.filter(req => req.receiverId === user._id)
    const dispatch = useDispatch()
    const location = useLocation()
    const { acceptConversation } = useSelector(state => state.conversation)
    const { deleteRequest } = useSelector(state => state.requests)
    const { socket } = useSelector(state => state.socketConfig)
    const { profileSidebar, serverSidebar, menuSidebar } = useSelector(state => state.users)

    useEffect(() => {
        if (!socket || !acceptConversation) return
        socket.emit('sendConversation', acceptConversation)
        dispatch(addConversationReset())
    }, [socket, acceptConversation, dispatch])

    useEffect(() => {
        if (!socket || !deleteRequest) return
        socket.emit('sendDeletedRequest', deleteRequest)
        dispatch(requestDeleteReset())
    }, [socket, deleteRequest, dispatch])

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
            <div className="flex items-center justify-between">
                <h1 className="text-gray-200 text-3xl font-semibold py-10">Requests - {yourRequests.length}</h1>
                <div className="icons flex gap-4">
                    <UserIcon className="w-7 h-7 fill-gray-300 cursor-pointer" onClick={() => dispatch(setProfileSidebar(!profileSidebar))} tabIndex={1} onBlur={() => dispatch(setProfileSidebar(false))} />
                    <MenuAlt3Icon className="w-7 h-7 fill-gray-300 cursor-pointer" onClick={() => dispatch(setServerSidebar(!serverSidebar))} tabIndex={1} onBlur={() => dispatch(setServerSidebar(false))} />
                    <MenuIcon className="w-7 h-7 fill-gray-300 cursor-pointer" onClick={() => dispatch(setMenuSidebar(!menuSidebar))} tabIndex={1} onBlur={() => dispatch(setMenuSidebar(false))} />
                </div>
            </div>

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
