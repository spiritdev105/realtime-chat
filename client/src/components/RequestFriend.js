import Avatar from './Avatar'
import { useDispatch } from 'react-redux'
import { deleteRequest } from '../slices/requestSlice'
import { newConversation } from '../slices/conversationSlice'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

export default function RequestFriend({ request, user }) {
    const dispatch = useDispatch()

    function removeRequest(msg) {
        const requestData = {
            reqMessage: msg,
            reqId: request._id
        }
        dispatch(deleteRequest(requestData))
    }

    function acceptRequestAndCreateConversation() {
        const conversationData = {
            members: [
                {
                    memberId: user._id,
                    memberUsername: user.username,
                    memberImage: user.imageUrl ? user.imageUrl : ''
                },
                {
                    memberId: request.senderId,
                    memberUsername: request.senderUsername,
                    memberImage: request.senderImage ? request.senderImage : ''
                }
            ]
        }

        removeRequest({ msgForReceiver: 'Accepted the request', msgForSender: `${user.username} accepted your request` })
        dispatch(newConversation(conversationData))
    }

    return (
        <div className="flex sm:flex-row flex-col justify-between mb-4">
            <div className="info flex gap-6 items-center">
                <Avatar image={request.senderImage ? request.senderImage : defaultImage} customStyle="w-14 h-14" />
                <div className="content">
                    <h3 className="capitalize text-2xl text-gray-200 font-medium">{request.senderUsername}</h3>
                    <p className="capitalize text-lg text-gray-500">Incoming Friend Request</p>
                </div>
            </div>

            <div className="buttons space-x-4 mt-3 sm:mt-0">
                <button onClick={acceptRequestAndCreateConversation} className={`text-gray-300 transition-all hover:bg-blue-600 bg-blue-500 px-12 py-3 text-center text-2xl font-medium rounded-md`}>Accept</button>
                <button
                    onClick={() => removeRequest({ msgForReceiver: 'Declined the request', msgForSender: `${user.username} declined your request` })}
                    className={`text-gray-300 transition-all hover:bg-red-600 bg-red-500 px-12 py-3 text-center text-2xl font-medium rounded-md`}>
                    Decline
                </button>
            </div>
        </div>
    )
}
