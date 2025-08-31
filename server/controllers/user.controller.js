const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

module.exports.addNewUser = async( req,res ) => {
    try {
         const { fName, lName, email, role, deptId  } = req.body
         const user = await prisma.user.create({
         data:{fName, lName, email, role:role.toUpperCase(), department: {connect: { id: deptId }}}
    })
        return res.json({ success:true, message:"User created successfully", user })
    } catch (error) {
         return res.json({ success:false, message:error.message })
    }
   
}

module.exports.updateUser = async(req,res) => {
    try{
        const { userId } = req.params
        const user = await prisma.user.update({
            where: {id:userId},
            data:{fName, lName, email, role}
        })
        return res.json({ success:true, message:"User updated successfully", user })
    }
    catch(err){
      return res.json({ success:false, message:err.message })
    }
}

module.exports.deleteUser = async(req,res) => {
    try{
        const{ id } = req.params
        const user = await prisma.user.delete({
            where: {id:Number(id)}
        })
        return res.json({ success:true, message:"User deleted successfully" })
    }
    catch(err){
        return res.json({ success:false, message:err.message })
    }
}

module.exports.getAllUsers  = async(req,res) => {
    try{
        const users = await prisma.user.findMany({
            include:{
                department:true
            }
        })
        return res.json({ success:true, users }) 
    }
    catch(err){
        return res.json({ success:false, message:err.message })
    }
}

module.exports.adminDashboardData = async(req,res) => {
    try{
        const totalUsers = await prisma.user.count()
        const totalTasks = await prisma.task.count()
        const completed = await prisma.task.count({
            where:{status:'COMPLETED'}
        })
        const activeManagers = await prisma.user.count({
            where:{
                role:'MANAGER',
                status:'ACTIVE'
            }
        })

        const completionRate = totalTasks > 0
       ? Math.floor((completed / totalTasks) * 100)
       : 0;
        const dashboardData = { totalUsers, totalTasks, completed, activeManagers, completionRate }
        return res.json({ success:true, dashboardData })
    }
    catch(err){
        return res.json({ success:false, message:err.message })
    }
}