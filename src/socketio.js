let onlineUsers = []
export default function(io) {
  io.on("connection", (socket) => {

    socket.on('online', ({ _id }) => {
      let users = onlineUsers.map(onlineUser => onlineUser._id)
      if (onlineUsers.length !== 0) {
        onlineUsers.forEach(onlineUser => {
          io.to(onlineUser.socketid).emit('online', { userid: _id })
        })
      }
      onlineUsers.push({ socketid: socket.id, _id })
      console.log(`push: ${onlineUsers.length}`)
    })
    socket.on('online-2', ({ to, from }) => {
      onlineUsers.forEach(onlineUser => {
        if (onlineUser._id === to) {
          setTimeout(() => {
            socket.to(onlineUser.socketid).emit('online-2', { userid: from })
          }, 1000)
        }
      })
    })
    socket.on('joinRoom', ({ curRoom, preRoom }) => {
      if (preRoom) {
        socket.leave(preRoom)
      }
      socket.join(curRoom)
    })

    socket.on('chat', ({ roomid, type, content, sender, receiver, isencrypted }) => {
      io.to(roomid).emit('chat', { roomid, type, content, sender, receiver, isencrypted })
      let user = onlineUsers.find(onlineUser => {
        return onlineUser._id === receiver
      })
      //update unseen message
      if (user) {
        io.to(user.socketid).emit('chat-2', { roomid })
      }
    })

    socket.on('disconnect', () => {
      let user = onlineUsers.find(onlineUser => {
        return onlineUser.socketid === socket.id
      })
      onlineUsers = onlineUsers.filter((onlineUser) => {
        return onlineUser.socketid !== socket.id
      })
      if (user && onlineUsers.length !== 0) {
        onlineUsers.forEach(onlineUser => {
          io.to(onlineUser.socketid).emit('offline', { userid: user._id })
        })
      }
      console.log(`pop: ${onlineUsers.length}`)
    })
  })
}
