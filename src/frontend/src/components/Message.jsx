export default function Message({props}){
  if(props.isFriend){
    return (
      <div className="flex justify-start px-2 break-words">
        <p className="p-1 max-w-[75%] border rounded-md break-all border-gray-300">{props.content}</p>
      </div>
    )
  }else{
    return (
      <div className="flex justify-end px-2 ">
        <p className="p-1 max-w-[75%] border break-all rounded-md border-gray-300 text-white bg-gray-700">{props.content}</p>
      </div>
    )
  }
}
