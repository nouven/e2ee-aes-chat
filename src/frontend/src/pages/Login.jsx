import {useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {authContext} from '../contexts/AuthContext'
import {login, getInfo} from '../api'
export default function Login() {
  let {setCurrentUser} = useContext(authContext)
  let [values, setValues] = useState({
    username: '',
    password: ''
  })
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
  const handleSubmit = async () => {
    let {username, password} = values
    if(!username || !password){
      console.log(`username or password is not empty!`)
      return 
    }
    //call api to get token
    let data = await login({username, password})
    if(data.token){
      //call api to get info current user
      let info = await getInfo({token: `Bearer ${data.token}`})
      setCurrentUser({
        _id: info._id,
        username: info.username
      })
      //write token to localStorage
      localStorage.setItem('token', `Bearer ${data.token}`)
      //navigate to chat page
      navigate('/')
    }
  }
  const handleChangeInput = (e) => {
    setValues(prev =>{
      return {
        ...prev,
        [e.target.name]:e.target.value
      }
    })
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
              <input onChange={e => handleChangeInput(e)} value={values[input.name]} className="p-1 border outline-none peer" {...others} />
            </div>
          </div>
        )
      })}
      <div className="flex justify-end">
        <button onClick={() => handleSubmit()} className='w-fit py-1 px-2 border border-black'>Login</button>
      </div>
      <div className="flex justify-end">
        <span>create an new account ?</span><Link className="underline" to='/register'>Register</Link>
      </div>
    </div>
  )
}
