const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

module.export.fetchNotifications = async(req,res) =>{
 try {
        const notifications = await prisma.notification.findMany()
        return res.json({success:true, notifications})
    } catch (error) {
        return res.json({ success:false, message:error.message })
    }
}