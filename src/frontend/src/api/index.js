import axios from 'axios'

const baseUrl = "http://localhost:5000"
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

