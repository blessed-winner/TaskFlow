const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

module.exports.fetchUserNotifications = async (req,res)=>{
    try {
      const { id } = req.params  
      const userNotifications = await prisma.notification.findMany({
        where: { id },
        include: {
            user:true
        }
      })

      return res.json({ success:true, userNotifications })
    } catch (error) {
       return res.json({ success:false, message:error.message })
    }
}
