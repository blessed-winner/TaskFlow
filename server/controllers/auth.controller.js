const jwt = require('jsonwebtoken')
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

module.exports.log_in_post = async(req, res) => {
    try {
          const { email, password } = req.body
          const user = await prisma.user.findUnique({
          where: { email }
             })
         if(!user){
            return res.json({ success:false, message:"User not found!!!" })
         }
         const authUser = await bcrypt.compare(password,user.password)
         if(!authUser){
            return res.json({ success:false, message:"Invalid credentials" })
         }
         const payload = { id: user.id, role: user.role };
         const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"1d",
         })
         return res.json({ success:true, token, user })
    } catch (error) {
        return res.json({ success:false,message:error.message })
    }
  
}