const { PrismaClient } = require('../generated/prisma')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

module.exports.addNewUser = async (req, res) => {
  try {
    const { fName, lName, email,password, role, deptId } = req.body
    
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        fName,
        lName,
        email,
        password:hashedPassword,
        role: role.toUpperCase(),
        department: deptId ? { connect: { id: Number(deptId) } } : undefined
      },
      include: {
        department: true 
      }
    })

    const io = req.app.get('io')
    io.to('user-admin').emit('notification',{
      type:"CREATE_USER",
      color:'green',
      message:`User ${user.fName} created successfully`,
    })
    
    return res.json({ success: true, message: "User created successfully", user })
  } catch (error) {
    console.error(error)
    return res.json({ success: false, message: error.message })
  }
}

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fName, lName, email, role, deptId } = req.body; 

    const data = {};
    if (fName !== undefined) data.fName = fName;
    if (lName !== undefined) data.lName = lName;
    if (email !== undefined) data.email = email;
    if (role !== undefined) data.role = role.toUpperCase();
    if (deptId !== undefined) {
      data.department = { connect: { id: Number(deptId) } };
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data,
      include: { department: true },
    });

    return res.json({ success: true, message: "User updated successfully", user });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


module.exports.deleteUser = async(req,res) => {
    try{
        const{ id } = req.params
        await prisma.task.deleteMany({
       where: { userId: Number(id) }
        })
        
        const user = await prisma.user.delete({
            where: {id:Number(id)}
        })
        const io = req.app.get('io')
        io.to('user-admin').emit('notification',{
          type:"DELETE_USER",
          message:`User ${user.fName} deleted`
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
                department:true,
                tasks:true
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

module.exports.userDashboardData = async (req,res) => {
  try {
    const userId = parseInt(req.user.id)
    const totalTasks = await prisma.task.count({
      where: { userId }
    })
    const completedTasks = await prisma.task.count({
       where: { userId,status:'COMPLETED' }
    })
   const inProgressTasks = await prisma.task.count({
    where: { userId, status:'IN_PROGRESS' }
   })
   const pendingTasks = await prisma.task.count({
     where:{ userId,status:'PENDING' }
   })
   const completionRate = totalTasks > 0
       ? Math.floor((completedTasks / totalTasks) * 100)
       : 0;
   const userDashboard = {
    totalTasks,
    completedTasks,
    inProgressTasks,
    pendingTasks,
    completionRate
   }

   return res.json({ success:true, userDashboard })
  } catch (error) {
     return res.json({ success:false, message:error.message })
  }
}

module.exports.managerDashboardData = async(req,res) => {
  try {
    const totalTasks = await prisma.task.count()
      const completedTasks = await prisma.task.count({
       where: { status:'COMPLETED' }
    })
    const teamMembers = await prisma.user.count()
    const overDueTasks = await prisma.task.count({
      where:{status:"OVERDUE"}
    })
     const pendingTasks = await prisma.task.count({
     where:{ status:'PENDING' }
   })

   const managerDashboard = {
    totalTasks,
    completedTasks,
    teamMembers,
    overDueTasks,
    pendingTasks
   }

   return res.json({ success:true, managerDashboard })

  } catch (error) {
       return res.json({ success:false, message:error.message })
  }
}
