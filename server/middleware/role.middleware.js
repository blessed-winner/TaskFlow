const roleMiddleware = (requiredRole) =>(req,res,next)=> {
    if(!req.user) return res.json({ success:false, message:'Unauthorized' })
    if(req.user.role !== requiredRole) return res.json({ success:false,message:'Forbidden:Insufficient role' })
    next()
} 

module.exports = roleMiddleware