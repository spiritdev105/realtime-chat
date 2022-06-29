import ErrMsg from "../components/ErrMsg";
import RequestFriend from "../components/RequestFriend";

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/da1787f0-f147-11ec-990c-0f218ff5e6ff?alt=media&token=a077a762-d3bd-4549-bb71-1d3afbab91b2'

export default function Requests() {
    return (
        <>
            <h1 className="text-gray-200 text-3xl font-semibold py-10">Requests - 4</h1>

            <div className="requestedFriends">
                {/* <ErrMsg errMsg="no requests found" /> */}
                <RequestFriend image={defaultImage} />
            </div>
        </>
    )
}
