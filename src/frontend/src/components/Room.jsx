export default function Room() {
  return (
    <div className="flex items-center h-12 border gap-3">
      <div className="relative">
        <div className="relative h-10 w-10 rounded-full overflow-hidden ">
          <img className='object-cover' src="https://tinhdaunhuy.com/wp-content/uploads/2015/08/default-avatar.jpg" alt="" />
        </div>
        <div className="absolute -bottom-1 -right-0 h-4 w-4 border-2 border-white   rounded-full bg-red-500 "></div>
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex justify-between">
          <div>Nouven</div>
          <div className="flex justify-center items-center h-5 w-5 rounded-full bg-red-500 text-white font-bold">3</div>
        </div>
        <div className="text-sm font-light truncate">error doloremque? Vel, sit.</div>
      </div>
    </div>
  )
}
