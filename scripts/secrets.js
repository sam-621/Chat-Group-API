const crypto = require('crypto');

const tokenSecret = crypto.randomBytes(64).toString('hex');

console.log('copy the output below and paste it in your env.local \n');

console.log(`JWT_SECRET=${tokenSecret}`);
