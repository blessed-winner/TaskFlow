export const user_data = [ 
{
  name:"Admin User",
  role:"Admin",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"AdminUser@company.com",
  dept:'IT'
}, 
{
  name:"StrawHat Luffy",
  role:"Manager",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"Mugiwara@company.com",
  dept:'Database'
},
{
  name:"Roronoa Zoro",
  role:"User",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"ashura@company.com",
  dept:'Database'
},
{
  name:"Diamante Figarland",
  role:"User",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"daimond@company.com",
  dept:'Industry'
},
{
  name:"Shanks Figarland",
  role:"User",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"shanks@company.com",
  dept:'Telecommunication'
},
{
  name:"Charlotte Linlin",
  role:"Admin",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"linlin@company.com",
  dept:'Design'
},
{
  name:"King Figarland",
  role:"Manager",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"king@company.com",
  dept:'Design'
}
]

export const task_data = 
   [
      {
         name:"Database optimization",
         isPending:true,
         isCompleted:false,
         dept:'IT'
      },
      {
         name:"Design user dashboard",
         isPending:true,
         isCompleted:false,
         dept:'Design'
      },
      {
         name:"Database Optimization",
         isPending:false,
         isCompleted:true,
         dept:'Database' 
      },
      {
        name:"Effective communication",
         isPending:true,
         isCompleted:false,
         dept:'Telecommunication'
      },
      {
          name:"Design communication networks",
         isPending:true,
         isCompleted:false,
         dept:'Network'
      }
      

   ]

 export const dashboardData = {
      totalUsers:1,
      totalTasks:2,
      completedTasks:1,
      activeManagers:1,
      completionRate:33.3
 }

 export const department_data = [
   {
      name:"IT",
      users:user_data.filter((user)=>user.dept === 'IT'),
      tasks:task_data.filter((task)=> task.dept === 'IT'),
      completed:0
   },
     {
      name:"Design",
      users:user_data.filter((user)=>user.dept === 'Design'),
      tasks:task_data.filter((task)=> task.dept === 'Design'),
      completed:0
   },
     {
      name:"Telecommunication",
      users:user_data.filter((user)=>user.dept === 'Telecommunication'),
      tasks:task_data.filter((task)=> task.dept === 'Telecommunication'),
      completed:0
   },
     {
      name:"Database",
      users:user_data.filter((user)=>user.dept === 'Database'),
      tasks:task_data.filter((task)=> task.dept === 'Database'),
      completed:0
   },
     {
      name:"Networking",
      users:user_data.filter((user)=>user.dept === 'Networking'),
      tasks:task_data.filter((task)=> task.dept === 'Networking'),
      completed:0
   }
 ]

 export const taskPriority = [ 'Low', 'Medium', 'High' ]