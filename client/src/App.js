import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddFriend from "./pages/AddFriend";
import ChatBox from "./pages/ChatBox";
import Requests from "./pages/Requests";

function App() {
  return (
    <div className="App">

      <Router>

        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<AddFriend />} />
            <Route path="requests" element={<Requests />} />
            <Route path="/:conversationId" element={<ChatBox />} />
          </Route>

        </Routes>

      </Router>
    </div>
  );
}

export default App;
