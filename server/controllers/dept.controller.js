const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()


module.exports.createDepartment = async( req,res ) => {
    try {
        const { name } = req.body
        const dept = await prisma.department.create( name )
        return res.json({ success:true, dept })
    } catch (error) {
         return res.json({ success:false, message:error.message })
    }
}

module.exports.getAllDepartments = async( req,res ) => {
    try {
        const department = await prisma.department.findMany({
            include:{
                users:true,
                tasks:true
            }
        })

        return res.json({ success:true, department })
    } catch (error) {
         return res.json({ success:false, message:error.message })
    }
}

