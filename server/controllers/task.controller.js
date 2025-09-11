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

        const io = req.app.get("io")
        io.emit(`user-${newTask.userId}-notification`,{
            type:"NEW_TASK",
            message:`New Task assigned: ${newTask.title}`,
            taskId:newTask.id,
            dueTask:newTask.dueDate 
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


module.exports.deleteTask = async (req,res) => {
  try {
    const {id} = req.params
    const parsedId = parseInt(id)
    const task = await prisma.task.delete({
       where: { id:parsedId }
    })
    return res.json( { success:true, message:"Task deleted successfully!!" } )
  } catch (error) {
     return res.json( { success:false, message:error.message } )
  }
}

// Toggle In Progress
module.exports.toggleInProgressTasks = async (req, res) => {
  try {
    const { id } = req.body

    const task = await prisma.task.update({
      where: { id },
      data: { status: 'IN PROGRESS' }
    })

    return res.json({ success: true, task })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

// Toggle Completed
module.exports.toggleCompletedTasks = async (req, res) => {
  try {
    const { id } = req.body

    const task = await prisma.task.update({
      where: { id },
      data: { status: 'COMPLETED' }
    })

    return res.json({ success: true, task })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

module.exports.updateTask = async (req,res) => {
   try {
    const { id } = req.params
    const parsedId = parseInt(id)

    const { title, description, assigneeName, priority, dueDate } = req.body

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id: parsedId }
    })

    if(!existingTask) {
      return res.json({ success: false, message: "Task not found" })
    }

    // If assigneeName is provided, find the assignee
    let assignee = null
    if(assigneeName) {
      const [fName, lName] = assigneeName.split(" ")
      assignee = await prisma.user.findFirst({
        where: {
          fName,
          lName
        }
      })

      if(!assignee) {
        return res.json({ success: false, message: "Assignee not found" })
      }
    }

    // Build update data object
    const updateData = {}
    
    if(title !== undefined) updateData.title = title
    if(description !== undefined) updateData.description = description
    if(priority !== undefined) updateData.priority = priority.toUpperCase()
    if(dueDate !== undefined) updateData.dueDate = new Date(dueDate)
    if(assignee) {
      updateData.user = { connect: { id: assignee.id } }
      updateData.department = { connect: { id: assignee.deptId } }
    }

    const updatedTask = await prisma.task.update({
      where: { id: parsedId },
      data: updateData,
      include: {
        user: true,
        department: true
      }
    })

    const io = req.app.get("io")
    io.emit(`user-${updatedTask.userId}-notification`,{
      type:'UPDATE_TASK',
      message:`Task Updated: ${ existingTask.title }`,
      })

    return res.json({ 
      success: true, 
      message: "Task updated successfully", 
      task: updatedTask 
    })
      
   } catch (error) {
      return res.json({ success: false, message: error.message })
   }
}
