const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

module.exports.fetchUserNotifications = async (req,res)=>{
    try {
      const { id } = req.params  
      const userNotifications = await prisma.notification.findMany({
        where: { userId: Number(id) },
        include: {
            user:true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

     const unreadCount = userNotifications.filter(note => note.isRead === false).length

      return res.json({ success:true, userNotifications, unreadCount })
    } catch (error) {
       return res.json({ success:false, message:error.message })
    }
}

module.exports.toggleStatus = async (req,res) => {
  try {
    const { id } = req.params
    await prisma.notification.updateMany({
      where: { userId: Number(id) },
      data:{
        isRead:true
      }
    })

    return res.json({ success:true })
  } catch (error) {
    return res.json({success:false, message:error.message})
  }
}

module.exports.clearAll = async(req,res) => {
  try{
    const { id } = req.params
    await prisma.notification.deleteMany({
      where: { userId: Number(id) }
    })
    return res.json({ success:true,message:"Notifications deleted successfully" })
  }
  catch(error){
    return res.json({ success:false,message:error.message })
  }
}
