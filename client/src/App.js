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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected from "./pages/Protected";
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from './slices/userSlice'

function App() {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(getUsers())
    }
  }, [user, dispatch])

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
                  <AddFriend />
                </Protected>
              }
            />

            <Route
              path="requests"
              element={
                <Protected user={user}>
                  <Requests />
                </Protected>
              }
            />

            <Route
              path="/:conversationId"
              element={
                <Protected user={user}>
                  <ChatBox />
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
