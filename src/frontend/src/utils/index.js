//import cryptoJs from 'crypto-js'
import df from 'diffie-hellman'
import { Buffer } from 'buffer'

export const generateKey = () => {
  return df.getDiffieHellman('modp15')
}


