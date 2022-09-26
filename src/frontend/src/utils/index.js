import cryptoJs from 'crypto-js'

export const aesEncrypt = (message, key) => {
  return cryptoJs.AES.encrypt(message, key).toString()
}
export const aesDecrypt = (message, key) => {
  try{
    let result = cryptoJs.AES.decrypt(message, key).toString(cryptoJs.enc.Utf8)
    if(result){
      return result
    }else{
      throw Error()
    }
  }
  catch(error){
    return "{{ this msg is not decrypted }}"
  }
}

