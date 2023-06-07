const jwt = require ("jsonwebtoken")

const secretkey = process.env.SECRET_KEY

const sign = (payload) => jwt.sign(payload, secretkey,{expiresIn : "6h"})

const verify = (token)=>jwt.verify(token, secretkey)


module.exports = {sign, verify}

