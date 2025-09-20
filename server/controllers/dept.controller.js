const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()


module.exports.createDepartment = async( req,res ) => {
    try {
        const { name } = req.body
        const managers = await prisma.user.findMany({
            where:{role:'MANAGER'}
        })
        const dept = await prisma.department.create({
            data:{
                name
            }
        })

        await Promise.all(
            managers.map(m => {
                prisma.notification.create({
                    type:"CREATE_DEPT"
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
    const dept = await prisma.department.delete({
        where:{ id:Number(id) }
    })
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

