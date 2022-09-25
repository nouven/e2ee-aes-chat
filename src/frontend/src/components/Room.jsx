import { useContext, useEffect, useState } from 'react'
import {authContext} from '../contexts/AuthContext'
import { chatContext } from '../contexts/ChatContext'
export default function Room({props }) {
  let {currentUser } = useContext(authContext)
  let {socket,setRooms, setMessages, currentRoom, setCurrentRoom} = useContext(chatContext)

  let handleClick = () => {
    if(currentRoom._id == props._id){
      return
    }
    let preRoom = currentRoom?._id
    let curRoom = props._id
    socket.emit('joinRoom', {curRoom, preRoom})
    setCurrentRoom(props)
    setRooms(prev => {
      return prev.map(room => {
        if(room._id == props._id){
          room.unSeenMsg = 0
        }
        return room
      })
    })
    setMessages([])
  }

  return (
    <div onClick={() => handleClick()} className="flex items-center h-12 border gap-3">
      <div className="relative">
        <div className="relative h-10 w-10 rounded-full overflow-hidden ">
          <img className='object-cover' src="https://tinhdaunhuy.com/wp-content/uploads/2015/08/default-avatar.jpg" alt="" />
        </div>
        {props.isOnline && (
          <div className="absolute -bottom-1 -right-0 h-4 w-4 border-2 border-white   rounded-full bg-green-500 "></div>
        )}
    </div>
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex justify-between">
          <div>{props.username}</div>
          {props.unSeenMsg != 0 && (
              <div className="flex justify-center items-center h-5 w-5 rounded-full bg-red-500 text-white font-bold">{props.unSeenMsg}</div>
            )
          }
        </div>
        <div className="text-sm font-light truncate">doloremque? Vel, sit.</div>
      </div>
    </div>
  )
}
