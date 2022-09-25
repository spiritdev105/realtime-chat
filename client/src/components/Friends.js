import { PlusIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import Accordion from "./Accordion"
import Friend from "./Friend"
import { useDispatch, useSelector } from "react-redux"
import { allMessages } from "../slices/messageSlice"
import { setActiveUsers } from "../slices/socketSlice"
import { useNavigate } from "react-router-dom"
import { setMenuSidebar } from "../slices/userSlice"

export default function Friends({ user, activeUrl }) {
  const [open, setOpen] = useState(true)
  const { conversations } = useSelector((state) => state.conversation)
  const { socket, allActiveUsers } = useSelector((state) => state.socketConfig)
  const { rooms } = useSelector((state) => state.room)
  const yourFriends = conversations.map((c) =>
    c.members.find((m) => m.memberId !== user._id)
  )
  const dispatch = useDispatch()
  const greenStatus = allActiveUsers.map((u) => u.userId)
  const navigate = useNavigate()

  function navigatePage(location) {
    navigate(location)
    dispatch(setMenuSidebar(false))
  }

  useEffect(() => {
    if (user) {
      const cid = conversations.map((c) => c._id)
      const roomId = rooms.map((r) => r._id)
      dispatch(allMessages([...cid, ...roomId]))
    }
  }, [dispatch, user])

  useEffect(() => {
    if (!socket) return

    socket.on("allActiveUsers", (activeUsers) => {
      dispatch(setActiveUsers(activeUsers))
    })

    return () => {
      socket.off("allActiveUsers", (activeUsers) => {
        dispatch(setActiveUsers(activeUsers))
      })
    }
  }, [socket, dispatch])

  return (
    <div>
      <Accordion name="Friends" setOpen={setOpen} open={open} />

      <div className={`${open ? "block" : "hidden"}`}>
        {yourFriends.map((f) => (
          <Friend
            navigatePage={navigatePage}
            active={greenStatus.includes(f.memberId)}
            key={f.memberId}
            yourFriend={f}
            activeUrl={activeUrl}
          />
        ))}
      </div>

      <div
        onPointerDown={() => navigatePage("/")}
        className="flex items-center gap-4 cursor-pointer mt-8"
      >
        <div className="w-9 h-9 rounded-xl bg-gray-700 flex justify-center items-center">
          <PlusIcon className="stroke-white w-4 h-4" />
        </div>
        <span className="text-gray-300 capitalize text-xl">add friends</span>
      </div>
    </div>
  )
}
