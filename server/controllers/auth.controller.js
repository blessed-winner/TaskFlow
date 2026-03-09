const jwt = require('jsonwebtoken')
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

module.exports.signup = async (req, res) => {
    try {
        const { fName, lName, email, password, deptId } = req.body;
        const parsedDeptId = Number(deptId)

        if (!Number.isInteger(parsedDeptId)) {
            return res.json({ success: false, message: "Valid department is required" })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                fName,
                lName,
                email,
                password: hashedPassword,
                department: { connect: { id: parsedDeptId } },
            },
            include: {
                department: true
            }
        });

        const payload = { id: newUser.id, role: newUser.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.json({ success: true, token, user: newUser });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

module.exports.log_in_post = async(req, res) => {
    try {
          const { email, password } = req.body
          const user = await prisma.user.findUnique({
          where: { email }
             })
         if(!user){
            return res.json({ success:false, message:"User not found!!!" })
         }
         const authUser = await bcrypt.compare(password,user.password)
         if(!authUser){
            return res.json({ success:false, message:"Invalid credentials" })
         }
         const payload = { id: user.id, role: user.role };
         const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"1d",
         })
         return res.json({ success:true, token, user })
    } catch (error) {
        return res.json({ success:false,message:error.message })
    }
  
}
