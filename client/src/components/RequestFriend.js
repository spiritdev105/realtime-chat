import Avatar from './Avatar'
import { useDispatch } from 'react-redux'
import { deleteRequest } from '../slices/requestSlice'
import { newConversation } from '../slices/conversationSlice'

export default function RequestFriend({ reqFriend, user }) {
    const dispatch = useDispatch()

    function removeRequest(msg) {
        const requestData = {
            reqMessage: msg,
            reqId: reqFriend._id
        }
        dispatch(deleteRequest(requestData))
    }

    function acceptRequestAndCreateConversation() {
        const conversationData = {
            members: [
                {
                    memberId: user._id,
                    memberUsername: user.username,
                    memberImage: user.imageUrl
                },
                {
                    memberId: reqFriend.senderId,
                    memberUsername: reqFriend.senderUsername,
                    memberImage: reqFriend.senderImage
                }
            ]
        }

        removeRequest('Accepted the request')
        dispatch(newConversation(conversationData))
    }

    return (
        <div className="flex justify-between mb-4">
            <div className="info flex gap-6 items-center">
                <Avatar image={reqFriend.senderImage} customStyle="w-14 h-14" />
                <div className="content">
                    <h3 className="capitalize text-2xl text-gray-200 font-medium">{reqFriend.senderUsername}</h3>
                    <p className="capitalize text-lg text-gray-500">Incoming Friend Request</p>
                </div>
            </div>

            <div className="buttons space-x-4">
                <button onClick={acceptRequestAndCreateConversation} className={`text-gray-300 transition-all hover:bg-blue-600 bg-blue-500 px-12 py-3 text-center text-2xl font-medium rounded-md`}>Accept</button>
                <button onClick={() => removeRequest('Declined the request')} className={`text-gray-300 transition-all hover:bg-red-600 bg-red-500 px-12 py-3 text-center text-2xl font-medium rounded-md`}>Decline</button>
            </div>
        </div>
    )
}
