import { BarChart3, Calendar, CheckCircle, Users } from "lucide-react"

export const user_data = [ 
{
  name:"Admin User",
  role:"Admin",
  completedTasks:[],
  pendingTasks:[],
  totalTasks:[],
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

export const task_data = [
  {
    name: "Database optimization",
    status: "In progress",
    dept: "IT",
    assignee: "Jane Smith",
    priority: "High",
    dueDate: "2/5/2024",
    description: "Improve database performance by refining queries and indexing."
  },
  {
    name: "Design user dashboard",
    status: "Completed",
    dept: "Design",
    assignee: "StrawHat Luffy",
    priority: "Medium",
    dueDate: "3/8/2024",
    description: "Create an intuitive and visually appealing user dashboard."
  },
  {
    name: "Database querying",
    status: "pending",
    dept: "Database",
    assignee: "Jane Smith",
    priority: "High",
    dueDate: "2/5/2024",
    description: "Develop and test queries to retrieve and manage data efficiently."
  },
  {
    name: "Effective communication",
    status: "completed",
    dept: "Telecommunication",
    assignee: "John Smith",
    priority: "Medium",
    dueDate: "2/5/2024",
    description: "Enhance team communication skills for better collaboration."
  },
  {
    name: "Design communication networks",
    status: "pending",
    dept: "Network",
    assignee: "Water Law",
    priority: "High",
    dueDate: "5/6/2024",
    description: "Plan and design robust communication networks"
  }
]

 export const dashboardData = {
      totalUsers:1,
      totalTasks:2,
      completedTasks:1,
      activeManagers:1,
      completionRate:33.3,
      overDueTasks:0,
      pending:1,
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

 export const features =[
  {
    icon:CheckCircle,
    title:"Smart Task Management",
    content:"Organize, prioritize, and track your tasks with intelligent automation and intuitive workflows."
  },
  {
    icon:Calendar,
    title:"Seamless Scheduling",
    content:"Integrate with your calendar and never miss a deadline with smart reminders and time blocking."
  },
  {
    icon:Users,
    title:"Team Collaboration",
    content:"Work together efficiently with real-time updates, shared projects, and team communication tools."
  },
  {
    icon:BarChart3,
    title:"Advanced Analytics",
    content:"Gain insights into your productivity patterns with detailed reports and performance tracking."
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