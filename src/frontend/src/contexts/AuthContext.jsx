import { useState } from "react"
import { createContext } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {login} from '../api'
import {getInfo} from '../api'


export const authContext = createContext()
export default function AuthContext({ children }) {
  let [currentUser, setCurrentUser] = useState()
  let navigate = useNavigate()
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      getInfo({token})
        .then((info) => {
          setCurrentUser({
            _id: info._id,
            username: info.username
          })
          navigate('/')
        })
        .catch(error => {
          console.log(error)
          navigate('/login')
        })
    } else {
      navigate('/login')
    }
  }, [])
  const checkLogin = () => {

  }
  const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
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
