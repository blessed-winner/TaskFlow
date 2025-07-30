export const user_data = [ 
{
  name:"Admin User",
  role:"Admin",
  completedTasks:[],
  pendingTasks:[],
  email:"AdminUser@company.com",
  dept:'IT',
  due:'5/3/2025'
}, 
{
  name:"StrawHat Luffy",
  role:"Manager",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"Mugiwara@company.com",
  dept:'Database',
  due:'5/3/2025'
},
{
  name:"Roronoa Zoro",
  role:"User",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"ashura@company.com",
  dept:'Database',
  due:'5/3/2025'
},
{
  name:"Diamante Figarland",
  role:"User",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"daimond@company.com",
  dept:'Industry',
  due:'4/12/2024'
},
{
  name:"Shanks Figarland",
  role:"User",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"shanks@company.com",
  dept:'Telecommunication',
  due:'3/4/2025'
},
{
  name:"Charlotte Linlin",
  role:"Admin",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"linlin@company.com",
  dept:'Design',
  due:'2/15/2024'
},
{
  name:"King Figarland",
  role:"Manager",
  totalTasks:[],
  completedTasks:[],
  pendingTasks:[],
  email:"king@company.com",
  dept:'Design',
  due:'4/5/2025'
}
]

export const task_data = 
   [
      {
         name:"Database optimization",
         status:'In progress',
         dept:'IT',
      },
      {
         name:"Design user dashboard",
         status:'In progress',
         dept:'Design'
      },
      {
         name:"Database querying",
         status:'pending',
         dept:'Database' 
      },
      {
        name:"Effective communication",
         status:'completed',
         dept:'Telecommunication'
      },
      {
         name:"Design communication networks",
         status:'pending', 
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

 export const userDashboardData = {
  totalTasks:2,
  completed:0,
  inProgress:1,
  completionRate:0,
  pending:1,
 }

 export const dummyTasks = [
  {
    name:"Implement user authentication",
    description:"Build a secure authentication system using JWT tokens",
    assigner:"John Manager",
    Due:'2/15/2025',
    status:"In progress",
    fields:[ 'backend','security' ],
    priority:'High'
},
{
    name:"Database optimization",
    description:"Optimize database queries for better performance",
    assigner:"John Manager",
    Due:'2/10/2024',
    status:"Pending",
    fields:[ 'database','performance' ],
    priority:'Medium'
}
 ]