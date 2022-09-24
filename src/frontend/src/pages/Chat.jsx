import Room from '../components/Room'
import { FiSend } from 'react-icons/fi'
import { useContext } from 'react'
import { authContext } from '../contexts/AuthContext'
import io from 'socket.io-client'
const socket = io('http://localhost:5001')
export default function Chat() {
  let { logout } = useContext(authContext)
  return (
    <div className="flex w-full h-full border border-black">
      <div className="flex flex-col w-[300px] gap-1 border-r">
        <div className="flex h-14 border">Chat</div>
        <div className="flex flex-col flex-1 gap-1 overflow-auto select-none">
          <Room />
          <Room />
          <Room />
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex h-14 border">
          <button onClick={logout}>Logout</button>
        </div>

        <div className="flex flex-col-reverse flex-1">

        </div>

        <div className="flex justify-between gap-1 items-center px-1 h-12 ">
          <div className="flex-1 border">
            <input className="w-full p-1 outline-none" type='text' />
          </div>
          <div className="text-xl">
            <FiSend />
          </div>
        </div>
      </div>
    </div >
  )
}
