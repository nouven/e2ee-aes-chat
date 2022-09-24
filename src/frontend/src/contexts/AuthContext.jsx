import { useState } from "react"
import { createContext } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const authContext = createContext()
export default function AuthContext({ children }) {
  let [currentUser, setCurrentUser] = useState()
  let navigate = useNavigate()
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      setTimeout(() => {
        setCurrentUser('nouven')
        navigate('/')
      }, 2000)
    } else {
      navigate('/login')
    }
  }, [])
  console.log(`authContext - reder - ${currentUser}`)
  const checkLogin = () => {

  }
  const logout = () => {
    localStorage.removeItem('token')
  }
  const value = {
    currentUser, setCurrentUser,
    logout,
  }
  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  )
}
