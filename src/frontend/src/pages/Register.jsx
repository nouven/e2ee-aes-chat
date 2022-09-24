import { Link } from 'react-router-dom'
export default function Register() {
  const inputs = [
    {
      id: 1,
      label: 'Username',
      name: 'username',
      type: 'text',
      errorMsg: "username is invalid!!",
      pattern: 'nouven',
      required: true,
    },
    {
      id: 2,
      label: 'Password',
      name: 'password',
      type: 'text',
      errorMsg: "password is invalid!!",
      pattern: 'nouven',
      required: true,
    },
    {
      id: 3,
      label: 'Confirm pass',
      name: 'confirmpassword',
      type: 'text',
      errorMsg: "confirm password is invalid!!",
      pattern: 'nouven',
      required: true,
    },
  ]
  return (
    <div className='relative flex flex-col gap-2 px-4 py-12 w-[400px] border border-black'>
      <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-2 border border-black bg-white">Register</div>
      {inputs.map(input => {
        let { id, label, errorMsg, ...others } = input
        return (
          <div key={id} className="flex">
            <label className="w-[125px] ">{label}</label>
            <div className="flex flex-col flex-1">
              <input className="p-1 border outline-none peer" {...others} />
              <div className="text-red-500 hidden peer-invalid:block">{errorMsg}</div>
            </div>
          </div>
        )
      })}
      <div className="flex justify-end">
        <button className='w-fit py-1 px-2 border border-black'>Signup</button>
      </div>
      <div className="flex justify-end">
        <Link className="underline" to='/login'>your already have an existing account </Link>
      </div>
    </div>
  )
}
