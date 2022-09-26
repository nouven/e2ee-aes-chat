import { useContext, useEffect, useState } from 'react'
import {authContext} from '../contexts/AuthContext'
import { chatContext } from '../contexts/ChatContext'
import {getAllMessage} from '../api'
import {aesDecrypt} from '../utils'
export default function Room({props }) {
  let {currentUser } = useContext(authContext)
  let {socket,setRooms, setMessages, currentRoom, setCurrentRoom} = useContext(chatContext)

  let handleClick = () => {
    if(currentRoom._id == props._id){
      return
    }
    let preRoom = currentRoom?._id
    let curRoom = props._id
    socket.emit('join-room', {curRoom, preRoom})
    setCurrentRoom(props)
    setRooms(prev => {
      return prev.map(room => {
        if(room._id == props._id){
          room.unSeenMsg = 0
        }
        return room
      })
    })
    getAllMessage({roomid: props._id}).then(data =>{
      let arr = data.map(message => {
        let{isencrypted, content, sender} = message
        let isFriend = true
        if (sender === currentUser._id) {
          isFriend = false
        }
        let key = localStorage.getItem(props._id)
        if (key && isencrypted) {
          content = aesDecrypt(content, key)
        }
        return {isFriend, content, isencrypted}
      })
      setMessages(arr)
    })
  }

  return (
    <div onClick={() => handleClick()} className="flex items-center h-12 border gap-3">
      <div className="relative">
        <div className="relative h-10 w-10 rounded-full overflow-hidden ">
          <img className='object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG-HjzFqPBh8BJyarI0wxpsKF7D100_Hgb9g&usqp=CAU" alt="" />
        </div>
        {props.isOnline && (
          <div className="absolute -bottom-1 -right-0 h-4 w-4 border-[3px] border-white   rounded-full bg-green-500 "></div>
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
