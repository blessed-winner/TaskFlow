const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

module.exports.fetchUserNotifications = async (req,res)=>{
    try {
      const { id } = req.params  
      const userNotifications = await prisma.notification.findMany({
        where: { id:Number(id) },
        include: {
            user:true
        }
      })

     const unreadCount = userNotifications.filter(note => { note.isRead === false })

      return res.json({ success:true, userNotifications, unreadCount })
    } catch (error) {
       return res.json({ success:false, message:error.message })
    }
}

module.exports.toggleStatus = async (req,res) => {
  try {
    await prisma.notification.update({
      data:{
        isRead:true
      }
    })

    return res.json({ success:true })
  } catch (error) {
    return res.json({success:false, message:error.message})
  }
}
