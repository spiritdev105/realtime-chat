import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import { useEffect } from "react"
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddFriend from "./pages/AddFriend";
import ChatBox from "./pages/ChatBox";
import Requests from "./pages/Requests";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected from "./pages/Protected";
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from './slices/userSlice'
import { allRequests, newRequest, requestDelete } from './slices/requestSlice'
import { addConversation, allConversations, rmConversation } from "./slices/conversationSlice";
import { allRooms, joinRoom, leavedRoom } from "./slices/roomSlice";
import RoomChat from "./pages/RoomChat";
import { io } from 'socket.io-client'
import { setSocket } from "./slices/socketSlice";
import { brandNewMsg } from "./slices/messageSlice";

function App() {
  const { user } = useSelector(state => state.auth)
  const { socket } = useSelector(state => state.socketConfig)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(getUsers())
      dispatch(allRequests())
      dispatch(allConversations())
      dispatch(allRooms())
    }

    // const newSocket = io('http://localhost:3001', { query: { id: user._id } })
    const newSocket = io('https://socket-chat-mern.herokuapp.com', { query: { id: user._id } })
    dispatch(setSocket(newSocket))

    return () => {
      newSocket.close()
    }
  }, [user, dispatch])

  useEffect(() => {
    if (!socket) return

    socket.on('receiveRequest', (userData) => {
      dispatch(newRequest(userData))
      toast('You have a new friend request', { type: 'info', autoClose: 2000 })
    })

    socket.on('saveConversation', (newConversation) => {
      dispatch(addConversation(newConversation))
    })

    socket.on('deleteRequest', ({ requestId, reqMsg }) => {
      toast(reqMsg, { type: 'info', autoClose: 2000 })
      dispatch(requestDelete(requestId))
    })

    socket.on('rmConversation', ({ rmMsg, cid }) => {
      toast(rmMsg, { type: 'error', autoClose: 2000 })
      dispatch(rmConversation(cid))
    })

    socket.on('joinRoom', (room, joinMsg) => {
      toast(joinMsg, { type: 'info', autoClose: 2000 })
      dispatch(joinRoom(room))
    })

    socket.on('leavedRoom', (room, lvMsg, userId) => {
      toast(lvMsg, { type: 'info', autoClose: 2000 })
      dispatch(leavedRoom({ room, userId }))
    })

    socket.on('brandNewMsg', (newMsg) => {
      dispatch(brandNewMsg(newMsg))
    })

    return () => {
      socket.off('receiveRequest', (userData) => {
        dispatch(newRequest(userData))
        toast('You have a new friend request', { type: 'info', autoClose: 2000 })
      })

      socket.off('saveConversation', (newConversation) => {
        dispatch(addConversation(newConversation))
      })

      socket.off('deleteRequest', ({ requestId, reqMsg }) => {
        toast(reqMsg, { type: 'info', autoClose: 2000 })
        dispatch(requestDelete(requestId))
      })

      socket.off('rmConversation', ({ rmMsg, cid }) => {
        toast(rmMsg, { type: 'error', autoClose: 2000 })
        dispatch(rmConversation(cid))
      })

      socket.off('joinRoom', (room, joinMsg) => {
        toast(joinMsg, { type: 'info', autoClose: 2000 })
        dispatch(joinRoom(room))
      })

      socket.off('leavedRoom', (room, lvMsg, userId) => {
        toast(lvMsg, { type: 'info', autoClose: 2000 })
        dispatch(leavedRoom({ room, userId }))
      })

      socket.off('newRoomMsg', (newMsg) => {
        dispatch(brandNewMsg(newMsg))
      })
    }
  }, [socket, dispatch])

  return (
    <div className="App">

      <Router>

        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layout user={user} />}>
            <Route
              index
              element={
                <Protected user={user}>
                  <AddFriend user={user} />
                </Protected>
              }
            />

            <Route
              path="requests"
              element={
                <Protected user={user}>
                  <Requests user={user} />
                </Protected>
              }
            />

            <Route
              path="/:username"
              element={
                <Protected user={user}>
                  <ChatBox user={user} />
                </Protected>
              }
            />

            <Route
              path="room/:roomId"
              element={
                <Protected user={user}>
                  <RoomChat user={user} />
                </Protected>
              }
            />

          </Route>

        </Routes>

      </Router>

      <ToastContainer position="top-right" newestOnTop />
    </div>
  );
}

export default App;
