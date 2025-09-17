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
        io.to('user-manager').emit('notification',{
            type:"NEW_TASK",
            color:'blue',
            message:`New Task assigned: ${newTask.title}`,
            taskId:newTask.id,
            dueTask:newTask.dueDate,
            priority:newTask.priority,
            timestamp:new Date()
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
 
    const overDueTasks = tasks.filter(t => new Date(t.dueDate).getTime() < Date.now())
    
     const io = req.app.get("io")
     if(overDueTasks.length > 0){
     io.to(`user-${userId}`).emit(`notification`,{
      type:"OVERDUE_TASK",
      color:'orange',
      message:`${overDueTasks.length} tasks are overdue`,
      tasks: overDueTasks,
      timestamp:new Date()
     })
    }

   return res.json({ success:true, tasks })
  } catch (error) {
    return res.json({ success:false, message:error.message })
  }
}


module.exports.deleteTask = async (req,res) => {
  try {
    const {id} = req.params
    const parsedId = parseInt(id)
    const taskToDelete = await prisma.task.delete({
       where: { id:parsedId }
    })
    const io = req.app.get("io")
    io.to(`user-manager`).emit('notification',{
        type:'DELETE_TASK',
        color:'red',
        message:`Task "${taskToDelete.title}" has been deleted`,
        taskId: taskToDelete.id,
        timestamp:new Date()
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

    const io = req.app.get("io")
    io.to(`user-${task.userId}`).emit('notification',{
      type:"TOGGLE_IN_PROGRESS",
      color:'yellow',
      message:`Task ${task.title} is now in progress`,
      taskId:task.id,
      timestamp:new Date()
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

      const io = req.app.get("io")
    io.to(`user-${task.userId}`).emit('notification',{
      type:"TOGGLE_COMPLETED",
      color:'green',
      message:`Task ${task.title} is now completed`,
      taskId:task.id,
      timestamp:new Date()
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

      const io = req.app.get('io')
      io.to(`user-${updatedTask.userId}`).emit('notification', {
      type: 'TASK_UPDATED',
      color:'blue',
      message: `Task Updated: ${existingTask.title}`,
      task: updatedTask,
      timestamp: new Date()
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
