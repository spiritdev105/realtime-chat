import { useSelector } from "react-redux";
import ErrMsg from "../components/ErrMsg";
import RequestFriend from "../components/RequestFriend";

export default function Requests({ user }) {
    const { requests } = useSelector(state => state.requests)
    const yourRequests = requests.filter(req => req.receiverId === user._id)

    return (
        <>
            <h1 className="text-gray-200 text-3xl font-semibold py-10">Requests - {yourRequests.length}</h1>

            <div className="requestedFriends">
                {
                    yourRequests.length ? yourRequests.map(req => (
                        <RequestFriend key={req._id} reqFriend={req} />
                    ))
                        : (
                            <ErrMsg errMsg="no requests found" />
                        )
                }
            </div>
        </>
    )
}
