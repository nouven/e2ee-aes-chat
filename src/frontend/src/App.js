import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import AuthContext, { authContext } from './contexts/AuthContext'
import { useContext } from 'react'

function App() {
  let { currentUser } = useContext(authContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return
      //return <Navigate to='/login' />
    }
    return children
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen p-12 ">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
