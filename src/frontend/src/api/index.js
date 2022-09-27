import axios from 'axios'

const baseUrl = "https://e2ee-aes-chat.herokuapp.com"
//const baseUrl = "http://192.168.0.103:5000"

export const login = async ({ username, password }) => {
  let data = await axios({
    method: 'post',
    url: `${baseUrl}/auth/login`,
    data: {
      username,
      password
    }
  })
  return data.data
}
export const getInfo = async ({ token }) => {
  let data = await axios({
    method: 'post',
    url: `${baseUrl}/auth/info`,
    headers: {
      token
    },
  })
  return data.data
}

export const register = async ({ username, password }) => {
  let data = await axios({
    method: 'post',
    url: `${baseUrl}/auth/register`,
    data: {
      username,
      password
    }
  })
  return data.data
}

export const getAllRoom = async ({ _id }) => {
  let data = await axios({
    method: 'get',
    url: `${baseUrl}/room/`,
    params: { _id }
  })
  return data.data
}

export const updateRoom = async ({ _id, isencrypted }) => {
  let data = await axios({
    method: 'put',
    url: `${baseUrl}/room/`,
    data: { _id, isencrypted }
  })
  return data.data
}
export const createMessage = async ({ roomid, type, content, sender, receiver, isencrypted }) => {
  let data = await axios({
    method: 'post',
    url: `${baseUrl}/message/`,
    data: {
      roomid,
      type,
      content,
      sender,
      receiver,
      isencrypted
    }
  })
  return data.data
}

export const getAllMessage = async ({ roomid }) => {
  let data = await axios({
    method: 'get',
    url: `${baseUrl}/message/`,
    params: { roomid }
  })
  return data.data
}
