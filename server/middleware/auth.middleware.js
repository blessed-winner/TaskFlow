const jwt = require('jsonwebtoken')

const authMiddleware = async ( req,res,next )=> {
   const authHeader = req.headers.authorization
   if(!authHeader) return res.status(401).json({ success:false,message:"No token found" })
   const token = authHeader.split(' ')[1]
   try {
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    req.user = payload
    next()
   } catch (error) {
     if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' })
     }
     return res.status(401).json({ success:false, message:'Invalid token' })
   }
}

module.exports = authMiddleware
