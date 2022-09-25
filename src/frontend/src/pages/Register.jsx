import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register} from '../api'
export default function Register() {
  let navigate = useNavigate()
  let [values, setValues] = useState({
    username: '',
    password: '',
    confirmpassword: '',
  })
  const inputs = [
    {
      id: 1,
      label: 'Username',
      name: 'username',
      type: 'text',
      errorMsg: "username is invalid!!",
      required: true,
    },
    {
      id: 2,
      label: 'Password',
      name: 'password',
      type: 'text',
      errorMsg: "password is invalid!!",
      required: true,
    },
    {
      id: 3,
      label: 'Confirm pass',
      name: 'confirmpassword',
      type: 'text',
      errorMsg: "confirm password is invalid!!",
      required: true,
    },
  ]
  const handleChangeInput = (e) => {
    setValues(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleSubmit = async () => {
    let {username, password, confirmpassword} = values
    if(!username || !password || !confirmpassword){
      console.log("empty!!")
      return 
    }
    if(password !== confirmpassword){
      console.log("confirm password not equal!!")
      return 
    }
    let data = await register({username, password})
    console.log(data)
    if(data){
      navigate('/login')
    }else{
      console.log(data, "sign up failure!!")
      return
    }
  }
  return (
    <div className='relative flex flex-col gap-2 px-4 py-12 w-[400px] border border-black'>
      <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-2 border border-black bg-white">Register</div>
      {inputs.map(input => {
        let { id, label, errorMsg, ...others } = input
        return (
          <div key={id} className="flex">
            <label className="w-[125px] ">{label}</label>
            <div className="flex flex-col flex-1">
              <input onChange={(e) => handleChangeInput(e)} value={values[input.name]} className="p-1 border outline-none peer" {...others} />
              <div className="text-red-500 hidden peer-invalid:block">{errorMsg}</div>
            </div>
          </div>
        )
      })}
      <div className="flex justify-end">
        <button onClick={() => handleSubmit()} className='w-fit py-1 px-2 border border-black'>Signup</button>
      </div>
      <div className="flex justify-end">
        <span>you already have an existing account ? </span><Link className="underline" to='/login'>Login</Link>
      </div>
    </div>
  )
}
