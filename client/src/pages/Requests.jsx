import { useSelector, useDispatch } from "react-redux";
import ErrMsg from "../components/ErrMsg";
import RequestFriend from "../components/RequestFriend";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import { requestReset } from '../slices/requestSlice'

export default function Requests({ user }) {
    const { requests, requestMessage, requestError, requestSuccess } = useSelector(state => state.requests)
    const yourRequests = requests.filter(req => req.receiverId === user._id)
    const dispatch = useDispatch()

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
                        <RequestFriend key={req._id} reqFriend={req} user={user} />
                    ))
                        : (
                            <ErrMsg errMsg="no requests found" />
                        )
                }
            </div>
        </>
    )
}
