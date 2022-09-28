import { createContext, useState, useEffect, useContext } from 'react'
import { authContext } from './AuthContext'
import { getAllRoom } from '../api'
import io from 'socket.io-client'

const chatContext = createContext()


export default function ChatContext({ children }) {
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])
  let [currentRoom, setCurrentRoom] = useState({})
  const [socket, setSocket] = useState(() => io('https://e2ee-aes-chat.herokuapp.com'))
  //const [socket, setSocket] = useState(() => io('http://192.168.0.103:5000'))
  let { currentUser } = useContext(authContext)
  const value = {
    rooms, setRooms,
    messages, setMessages,
    currentRoom, setCurrentRoom,
    socket,
  }

  useEffect(() => {
    getAllRoom({ _id: currentUser._id })
      .then(data => {
        let xxx = []
        data.forEach(elmt => {
          let x = elmt.members.filter(member => {
            return (member.userid !== currentUser._id)
          })
          let isencrypted = elmt.isencrypted
          let isOnline = false
          let unSeenMsg = 0
          let _id = elmt._id
          let userid = x[0].userid
          let username = x[0].username
          xxx.push({ _id, isOnline, unSeenMsg, userid, username, isencrypted })
        })
        setRooms(xxx)
      })
  }, [])
  return (
    <chatContext.Provider value={value}>
      {children}
    </chatContext.Provider>
  )
}
export { chatContext }
