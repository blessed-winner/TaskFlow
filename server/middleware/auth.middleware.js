const jwt = require('jsonwebtoken')

const authMiddleware = async ( req,res,next )=> {
   const authHeader = req.headers.authorization
   if(!authHeader) return res.json({ success:false,message:"No token found" })
   const token = authHeader.split(' ')[1]
   try {
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    req.user = payload
    next()
   } catch (error) {
     return res.json({ success:false, message:error.message })
   }
}

module.exports = authMiddleware