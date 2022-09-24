import {useEffect , useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {authContext} from '../contexts/AuthContext'
export default function Login() {
  let {setCurrentUser} = useContext(authContext)
  let navigate = useNavigate()
  const inputs = [
    {
      id: 1,
      label: 'Username',
      name: 'username',
      type: 'text',
    },
    {
      id: 2,
      label: 'Password',
      name: 'password',
      type: 'text',
    },
  ]
  const handleSubmit = () => {
    setTimeout(() => {
      localStorage.setItem('token', 'value of token')
      setTimeout(() => {
        setCurrentUser('nouven is loggined')
        navigate('/')
      },2000) 
    },2000)
  }
  return (
    <div className='relative flex flex-col gap-2 px-4 py-12 w-[400px] border border-black'>
      <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-2 border border-black bg-white">Login</div>
      {inputs.map(input => {
        let { id, label, ...others } = input
        return (
          <div key={id} className="flex">
            <label className="w-[125px] ">{label}</label>
            <div className="flex flex-col flex-1">
              <input className="p-1 border outline-none peer" {...others} />
            </div>
          </div>
        )
      })}
      <div className="flex justify-end">
        <button onClick={() => handleSubmit()} className='w-fit py-1 px-2 border border-black'>Login</button>
      </div>
      <div className="flex justify-end">
        <Link className="underline" to='/register'>create an new account?</Link>
      </div>
    </div>
  )
}
