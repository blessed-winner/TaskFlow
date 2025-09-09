const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

module.exports.addNewTask = async(req,res) => {
    try {
        const { title, description, assigneeName, priority, dueDate } = req.body
        const existingTask = await prisma.task.findUnique({
            where:{ title }
        })
        if(existingTask){
            return res.json({ success:false, message:"Task already exists" })
        }

        const[fName,lName] = assigneeName.split(" ")

        const assignee = await prisma.user.findFirst({
            where:{
                fName,
                lName
            }
        })

        if(!assignee){
            return res.json({ success:false, message:"Assignee not found" })
        }
        const newTask = await prisma.task.create({
            data:{
               title,
              description,
              user:{ connect: {id:assignee.id} },
              priority:priority.toUpperCase(),
              dueDate:new Date(dueDate),
              department:{ connect:{id:assignee.deptId} }
            }
          
        })

        return res.json({ success:true, message:"Task created successfully", newTask })

    } catch (error) {
        return res.json({ success:false, message:error.message })
    }
}

module.exports.fetchAllTasks = async (req,res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        user: true,
        department: true
      }
    })
    return res.json({ success:true, tasks })
  } catch (error) {
    return res.json({ success:false, message:error.message })
  }
}

module.exports.fetchUserTasks = async (req,res) => {
  try {
    const userId = parseInt(req.params.userId)
    const tasks = await prisma.task.findMany({
      where: { userId },
      include: {
        user: true,
        department: true
      }
    })
    return res.json({ success:true, tasks })
  } catch (error) {
    return res.json({ success:false, message:error.message })
  }
}
