import { useRef, useState, useEffect } from 'react'
import SearchedFriend from '../components/SearchedFriend'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setUrl } from '../slices/userSlice'
import ResIcons from "../components/ResIcons";

export default function AddFriend({ user }) {
    const { allUsers } = useSelector(state => state.users)
    const { requests } = useSelector(state => state.requests)
    const { conversations } = useSelector(state => state.conversation)
    const friendUsername = useRef()
    const [friend, setFriend] = useState(null)
    const [inReq, setInReq] = useState(false)
    const [added, setAdded] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (friend) {
            const checkAdded = conversations.some(c => c.members.some(m => m.memberId === friend._id))
            checkAdded ? setAdded(true) : setAdded(false)

            if (checkAdded) return

            const checkReq = requests.find(req => req.receiverId === friend._id && req.senderId === user._id)
            checkReq ? setInReq(true) : setInReq(false)
        }
    }, [friend, setInReq, setAdded, user._id, requests, conversations])

    useEffect(() => {
        dispatch(setUrl(''))
    }, [dispatch])

    function searchFriend(e) {
        e.preventDefault()

        const value = friendUsername.current.value

        if (!value) return

        const findFriend = allUsers.find(friend => user.username !== value && friend.username === value)

        if (!findFriend) toast("User couldn't found. Check if username is correct", { type: 'warning', autoClose: 2500 })

        setFriend(findFriend)
        friendUsername.current.value = ''
    }

    return (
        <>
            <section className="py-10 border-0 border-b border-gray-800 border-solid">
                <div className="flex items-center justify-between">
                    <h1 className="text-gray-200 text-3xl font-semibold pb-2">Add Friend</h1>
                    <div className="icons flex gap-4">
                        <ResIcons />
                    </div>
                </div>
                <p className="text-gray-500 text-xl">You can add friend with their username. It's cAsE-sEnSeTiVe</p>
                <form className="bg-gray-700 rounded-xl flex gap-4 items-center py-3 px-4 mt-6">
                    <input ref={friendUsername} type="text" placeholder="Enter a Username" className="w-full bg-gray-700 text-xl text-gray-300 rounded-md" />
                    <input onClick={searchFriend} type="submit" value="Find friend" className="px-12 py-2.5 text-center text-2xl text-gray-300 font-medium bg-blue-500 rounded-md cursor-pointer transition-all hover:bg-blue-600" />
                </form>
            </section>

            <div className="searchedFriends">
                {
                    friend ? (
                        <SearchedFriend added={added} sent={inReq} friend={friend} user={user} />
                    ) : (
                        <div className="noSearch">
                            <img src="/images/group.svg" alt="" className="w-[48rem] h-[34rem] object-cover mx-auto" />
                            <p className="text-gray-500 text-xl text-center mt-5">Wumpus is waiting on friends. You don't have to, though.</p>
                        </div>
                    )
                }
            </div>
        </>
    )
}
