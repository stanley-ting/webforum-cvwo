
import './App.css'
import Login from './components/Login';
import "./index.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from './components/Register';
import Homepage from './components/Homepage';
import MyPosts from './components/MyPosts';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Chat from './components/Chat';



function App() {
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login page */}
          <Route path="/register" element={<Register />} /> {/* Register page */}
          <Route path="/homepage" element={<Homepage />} /> {/* Homepage */}
          <Route path ="/my-posts" element = {<MyPosts/>}/>
          <Route path ="/create" element = {<CreatePost/>}/>
          <Route path ="/my-posts/:id/edit" element = {<EditPost/>}/>
          <Route path ="/chats/:chatId/messages" element = {<Chat/>}/>
        </Routes>
      </div>
    </Router>

  )

}

export default App;
