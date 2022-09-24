import crypto from 'crypto'
import { argv0 } from 'process';


// Calling two getDiffieHellman method
// with its parameter, groupName
const diffiehellmangrp1 = crypto.getDiffieHellman('modp14');
const diffiehellmangrp2 = crypto.getDiffieHellman('modp14');

// Generating keys
diffiehellmangrp1.generateKeys();
diffiehellmangrp2.generateKeys();


// Computing secret
const diffiehellmangrp1sc = diffiehellmangrp1
  .computeSecret(diffiehellmangrp2.getPublicKey(), null);

const diffiehellmangrp2sc = diffiehellmangrp2
  .computeSecret(diffiehellmangrp1.getPublicKey(), null);

console.log(diffiehellmangrp1sc.toString('hex') === diffiehellmangrp2sc.toString('hex'))

const data = []





