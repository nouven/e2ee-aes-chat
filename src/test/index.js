import crypto from 'crypto'
import { argv } from 'process';
import cryptJs from 'crypto-js'



const A = crypto.getDiffieHellman('modp15')
const B = crypto.getDiffieHellman('modp15')
const C = crypto.getDiffieHellman('modp15')

A.generateKeys()
C.generateKeys()
B.generateKeys()

let AC = A.computeSecret(C.getPublicKey(), null, 'hex')
let BC = B.computeSecret(C.getPublicKey(), null, 'hex')

let aKey = A.computeSecret(Buffer.from(BC, 'hex'), null, 'hex')
let bKey = B.computeSecret(Buffer.from(AC, 'hex'), null, 'hex')

console.log(aKey === bKey)

let cipherText = cryptJs.AES.encrypt('hello word', aKey).toString()
let plainText = cryptJs.AES.decrypt(cipherText, bKey).toString(cryptJs.enc.Utf8)
console.log(`cipher text: ${cipherText}`)
console.log(`plain text: ${plainText}`)

