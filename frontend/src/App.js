import './App.css';
import Login from './components/LoginPage/Login';
import Register from './components/Register/Register';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import ChatPage from './components/ChatPage/ChatPage';
import AddContact from './components/AddContact/AddContact'
import UpdateContact from './components/UpdateContact/UpdateContact';

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat-app' element={<ChatPage />} />
          <Route path='/new-contact' element={<AddContact />} />
          <Route path='/update-contact/:id' element={<UpdateContact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
