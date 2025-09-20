const { PrismaClient } = require('../generated/prisma')
const { sendNotifications } = require('../utils/notifications')
const prisma = new PrismaClient()

module.exports.addNewTask = async(req,res) => {
    try {
        const { title, description, assigneeName, priority, dueDate } = req.body

        const managers = await prisma.user.findMany({
           where:{ role: 'MANAGER' }
        })


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

         const assigneeId = assignee.id

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

          await Promise.all(
            managers.map(m=>{
                prisma.notification.create({
                data:{
                   type:"NEW_TASK",
                   message:`Task created: ${newTask.title}`,
                   user: {connect:{id:Number(m.id)}}
                 }
               }).then(notification => {
                sendNotifications(m.id,notification)
              })
              })
          )

          const userNotification = await prisma.notification.create({
            data:{
              type:"NEW_TASK",
              message:`Task assigned: ${newTask.title}`,
              user:{connect:{id:Number(assigneeId)}}
            }
          })

          sendNotifications(newTask.assigneeId,userNotification)

     
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

    const managers = await prisma.user.findMany({
      where: { role:"MANAGER" }
    })

    const tasks = await prisma.task.findMany({
      where: { userId },
      include: {
        user: true,
        department: true
      }
    })

    const user = await prisma.user.findUnique({
      where: { id:userId }
    })
 
    const overDueTasks = tasks.filter(t => new Date(t.dueDate).getTime() < Date.now())
    
    if(overDueTasks > 0){
           await Promise.all(
      managers.map(m =>
        prisma.notification.create({
          data: {
            type: "OVERDUE_TASK",
            message: `${overDueTasks.length} tasks are overdue for ${user.fName} ${user.lName}`,
            user: { connect: { id: m.id } }
          }
        }).then(notification => {
          sendNotifications(m.id, notification)
        })
      )
    )

       const userNotification = await prisma.notification.create({
        data: {
        type: "OVERDUE_TASK",
        message: `You have ${overDueTasks.length} overdue task(s).`,
        user: { connect: { id: userId } }
       }
      })


      sendNotifications(userId,userNotification)
    }


   return res.json({ success:true, tasks })
  } catch (error) {
    return res.json({ success:false, message:error.message })
  }
}


module.exports.deleteTask = async (req,res) => {
  try {
    const {id} = req.params
    const managers = await prisma.user.findMany({
      where: { role:'MANAGER' }
    })
    const parsedId = parseInt(id)
    const taskToDelete = await prisma.task.delete({
       where: { id:parsedId }
    })

    const userId = taskToDelete.userId

    await Promise.all(
      managers.map(m =>
        prisma.notification.create({
          data: {
            type: "DELETE_TASK",
            message: `Task deleted : ${taskToDelete.title}`,
            user: { connect: { id: m.id } }
          }
        }).then(notification => {
          sendNotifications(m.id, notification)
        })
      )
    )

    const userNotification = await prisma.notification.create({
      data: {
        type: "DELETE_TASK",
        message: `Task deleted: ${taskToDelete.title}`,
        user: { connect: { id: userId } }
      }
    })

    sendNotifications(userId,userNotification)

    return res.json( { success:true, message:"Task deleted successfully!!" } )
  } catch (error) {
     return res.json( { success:false, message:error.message } )
  }
}

module.exports.toggleInProgressTasks = async (req, res) => {
  try {
    const { id } = req.body
    const managers = await prisma.user.findMany({
      where: { role:'MANAGER' }
    })

    const task = await prisma.task.update({
      where: { id },
      data: { status: 'IN_PROGRESS' }
    })

    await Promise.all(
      managers.map(m =>
        prisma.notification.create({
          data: {
            type: "TOGGLE_IN_PROGRESS",
            message: `Task in progress: ${task.title}`,
            user: { connect: { id: m.id } }
          }
        }).then(notification => {
          sendNotifications(m.id, notification)
        })
      )
    )

    const userNotification = await prisma.notification.create({
      data: {
        type: "TOGGLE_IN_PROGRESS",
        message: `Task in progress: ${task.title}`,
        user: { connect: { id: task.userId } }
      }
    })

    sendNotifications(task.userId,userNotification)


    return res.json({ success: true, message:"Task marked in progress", task })
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

// Toggle Completed
module.exports.toggleCompletedTasks = async (req, res) => {
  try {
    const { id } = req.body
    const managers = await prisma.user.findMany({
      where: { role:"MANAGER" }
    })

    const task = await prisma.task.update({
      where: { id },
      data: { status: 'COMPLETED' }
    })

  await Promise.all(
      managers.map(m =>
        prisma.notification.create({
          data: {
            type: "TOGGLE_COMPLETED",
            message: `Task completed: ${task.title}`,
            user: { connect: { id: m.id } }
          }
        }).then(notification => {
          sendNotifications(m.id, notification)
        })
      )
    )

    const userNotification = await prisma.notification.create({
      data: {
        type: "TOGGLE_COMPLETED",
        message: `Task completed: ${task.title}`,
        user: { connect: { id: task.userId } }
      }
    })

    sendNotifications(task.userId,userNotification)

    return res.json({ success: true, message:"Task marked completed", task })
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

  await Promise.all(
            managers.map(m=>{
                prisma.notification.create({
                data:{
                   type:"UPDATE_TASK",
                   message:`Task ${updatedTask.title} updated successfully`,
                   user: {connect:{id:Number(m.id)}}
                 }
               }).then(notification => {
                sendNotifications(m.id,notification)
              })
              })
          )

          const userNotification = await prisma.notification.create({
            data:{
              type:"UPDATE_TASK",
              message:`Task ${updatedTask.title} was updated`,
              user:{connect:{id:Number(updatedTask.userId)}}
            }
          })

          sendNotifications(updatedTask.userId,userNotification)

    return res.json({ 
      success: true, 
      message: "Task updated successfully", 
      task: updatedTask 
    })
      
   } catch (error) {
      return res.json({ success: false, message: error.message })
   }
}
