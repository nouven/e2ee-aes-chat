export default function Message({props}){
  if(props.isFriend){
    return (
      <div className="flex justify-start px-2">
        <p className="p-1 max-w-[75%] border border-gray-300">{props.content}</p>
      </div>
    )
  }else{
    return (
      <div className="flex justify-end px-2">
        <p className="p-1 max-w-[75%] border border-gray-300">{props.content}</p>
      </div>
    )
  }
}
