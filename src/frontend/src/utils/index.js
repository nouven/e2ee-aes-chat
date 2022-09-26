import cryptoJs from 'crypto-js'

export const aesEncrypt = (message, key) => {
  return cryptoJs.AES.encrypt(message, key).toString()
}
export const aesDecrypt = (message, key) => {
  return cryptoJs.AES.decrypt(message, key).toString(cryptoJs.enc.Utf8)
}

