import Room from '../components/Room'
import Message from '../components/Message'
import { FiSend, FiLogOut } from 'react-icons/fi'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { generateKey } from '../utils'
import df from 'diffie-hellman'

import { useContext, useEffect, useRef, useState } from 'react'
import { authContext } from '../contexts/AuthContext'
import { chatContext } from '../contexts/ChatContext'


export default function Chat() {
  let { logout, currentUser } = useContext(authContext)
  let { rooms, setRooms, messages, setMessages, currentRoom, setCurrenRoom, socket } = useContext(chatContext)

  let [inputValue, setInputValue] = useState('')
  let [diffie, setDiffie] = useState(() => {
    let A = df.getDiffieHellman('modp15')
    A.generateKeys()
    return A
  })


  useEffect(() => {
    socket.emit('online', { _id: currentUser._id })
  }, [])

  useEffect(() => {
    socket.on('online', ({ userid }) => {
      setRooms(prev => {
        return prev.map(room => {
          if (room.userid === userid) {
            room.isOnline = true
          }
          return room
        })
      })
      socket.emit('online-2', ({ to: userid, from: currentUser._id }))
    })
    socket.on('online-2', ({ userid }) => {
      setRooms(prev => {
        return prev.map(room => {
          if (room.userid === userid) {
            room.isOnline = true
          }
          return room
        })
      })
    })
    socket.on('offline', ({ userid }) => {
      setRooms(prev => {
        return prev.map(room => {
          if (room.userid === userid) {
            room.isOnline = false
          }
          return room
        })
      })
    })
    return () => {
      socket.off('online')
      socket.off('online-2')
      socket.off('offline')
    }
  }, [rooms])
  useEffect(() => {
    socket.on('chat', ({ roomid, type, content, sender, receiver, isencrypted }) => {
      let isFriend = true
      if (sender === currentUser._id) {
        isFriend = false
      }
      setMessages(prev => {
        return [{ isFriend, content, isencrypted }, ...prev]
      })
    })
    socket.on('chat-2', ({ roomid }) => {
      if (currentRoom._id !== roomid) {
        setRooms(prev => {
          return prev.map(room => {
            if (room._id == roomid) {
              room.unSeenMsg += 1
            }
            return room
          })
        })
      }
    })
    return () => {
      socket.off('chat')
      socket.off('chat-2')
    }
  }, [currentRoom])

  useEffect(() => {
    socket.on('exchange-key-2', ({ from, to, roomid, message }) => {
      console.log(message)
    })
    socket.on('exchange-key-3', ({ from, to, roomid, c }) => {
      let cc = diffie.computeSecret(Buffer.from(c, 'hex'), null, 'hex').toString('hex')
      socket.emit('exchange-key-4', { from, to, roomid, cc })
    })
    socket.on('exchange-key-5', ({ from, to, roomid, cc }) => {
      let ccc = diffie.computeSecret(Buffer.from(cc, 'hex'), null, 'hex').toString('hex')
      console.log(ccc)
    })
    return () => {
      socket.off('exchange-key-2')
      socket.off('exchange-key-3')
      socket.off('exchange-key-5')
    }
  }, [currentRoom])

  let handleSubmit = (e) => {
    if (e.keyCode == 13) {
      let roomid = currentRoom._id
      let type = 'text'
      let content = inputValue
      let sender = currentUser._id
      let receiver = currentRoom.userid
      let isencrypted = false
      socket.emit('chat', { roomid, type, content, sender, receiver, isencrypted })
      setInputValue('')
    } else {
      return
    }
  }
  let handleExchangeKey = () => {
    socket.emit('exchange-key-1', { from: currentUser._id, to: currentRoom.userid, roomid: currentRoom._id })
  }
  return (
    <div className="flex w-full h-full border border-black">
      <div className="flex flex-col w-[300px] gap-1 border-r">
        <div className="flex items-center h-14 border">
          <div className="flex justify-start items-end gap-2 flex-1">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG-HjzFqPBh8BJyarI0wxpsKF7D100_Hgb9g&usqp=CAU" alt="" className="object-cover" />
            </div>
            <p className="font-medium text-xl">{currentUser.username}</p>
          </div>
          <div onClick={() => logout()} className="text-xl p-2 rounded-full cursor-pointer hover:bg-gray-100 mr-1"><FiLogOut /></div>
        </div>
        <div className="flex flex-col flex-1 gap-1 overflow-auto select-none">
          {rooms.map(room => {
            return (
              <Room key={room._id} props={room} />
            )
          })}
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        {currentRoom._id && (
          <div className="flex items-center h-14 border">
            <div className="flex justify-start items-end gap-2 flex-1">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img src="https://tinhdaunhuy.com/wp-content/uploads/2015/08/default-avatar.jpg" alt="" className="object-cover" />
              </div>
              <p className="font-medium text-xl">{currentRoom.username}</p>
            </div>
            <div onClick={() => (handleExchangeKey())} className="text-2xl p-2 rounded-full cursor-pointer hover:bg-gray-100 mr-1">
              {currentRoom.isencrypted ? <AiFillLock /> : <AiFillUnlock />}
            </div>
          </div>
        )}

        <div className="flex gap-1 flex-col-reverse flex-1 overflow-auto">
          {messages.map((message, index) => {
            return (
              <Message key={index} props={message} />
            )
          })}
        </div>
        {currentRoom._id && (
          <div className="flex justify-between gap-1 items-center px-1 h-12 ">
            <div className="flex-1 border border-black">
              <input onKeyDown={e => handleSubmit(e)} onChange={(e) => setInputValue(e.target.value)} value={inputValue} className="w-full p-1 outline-none" type='text' />
            </div>
            <div className="text-xl">
              <FiSend />
            </div>
          </div>
        )}
      </div>
    </div >
  )
}
