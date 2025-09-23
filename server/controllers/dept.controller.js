const { PrismaClient } = require('../generated/prisma')
const { sendNotifications } = require('../utils/notifications')

const prisma = new PrismaClient()


module.exports.createDepartment = async( req,res ) => {
    try {
        const { name } = req.body
        const managers = await prisma.user.findMany({
            where:{role:'MANAGER'}
        })

        const admins = await prisma.user.findMany({
            where:{role:"ADMIN"}
        })

        const dept = await prisma.department.create({
            data:{
                name
            }
        })

        await Promise.all(
            managers.map(m => {
                prisma.notification.create({
                    data:{
                    type:"CREATE_DEPT",
                    message:`Department created: ${dept.name}`,
                    user: { connect:{id:m.id} }
                    }
                }).then(notification => {
                    sendNotifications(m.id,notification)
                })
            })
        )
            await Promise.all(
            admins.map(a => {
                prisma.notification.create({
                    data:{
                    type:"CREATE_DEPT",
                    message:`Department created: ${dept.name}`,
                    user: { connect:{id:a.id} }
                    }
                }).then(notification => {
                    sendNotifications(a.id,notification)
                })
            })
        )
        return res.json({ success:true, message:"Department created successfully", dept })
    } catch (error) {
         return res.json({ success:false, message:error.message })
    }
}

module.exports.deleteDepartment = async(req,res) => {
   try{
    const {id} = req.params
    const managers = await prisma.user.findMany({
        where:{role:"MANAGER"}
    })
    const admins = await prisma.user.findMany({
            where:{role:"ADMIN"}
        })
    const dept = await prisma.department.delete({
        where:{ id:Number(id) }
    })

      await Promise.all(
            managers.map(m => {
                prisma.notification.create({
                    data:{
                    type:"DELETE_DEPT",
                    message:`Department deleted: ${dept.name}`,
                    user: { connect:{id:m.id} }
                    }
                }).then(notification => {
                    sendNotifications(m.id,notification)
                })
            })
        )
          await Promise.all(
            admins.map(a => {
                prisma.notification.create({
                    data:{
                    type:"DELETE_DEPT",
                    message:`Department deleted: ${dept.name}`,
                    user: { connect:{id:a.id} }
                    }
                }).then(notification => {
                    sendNotifications(a.id,notification)
                })
            })
        )

    return res.json({ success:true, message:"Department removed successfully" })
   }
   catch(err){
     return res.json({ success:false, message:err.message })
   }
}

module.exports.getAllDepartments = async( req,res ) => {
    try {
        const departments = await prisma.department.findMany({
            include:{
                users:true,
                tasks:true
            }
        })

        return res.json({ success:true, departments })
    } catch (error) {
         return res.json({ success:false, message:error.message })
    }
}

