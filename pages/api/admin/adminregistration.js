import ConnectDB from "@/utils/connectDB"
import Admin from "../../../model/adminSchema"
import bcrypt from "bcrypt"

async function handler(req,res) {
   if(req.method === "POST"){

      try {
        const {email,password} = req.body
       await ConnectDB()
        const foundUser = await Admin.findOne({email:email})
        if(foundUser){ 
          return res.status(403).json({message:"User Aready Exist"})
        }
       const hashedPassword = await bcrypt.hash(password,10)
        const admin = new Admin({
          email:email,
          password:hashedPassword
        })
        await admin.save()
        
        // console.log(body.email)
        // console.log(body.password)
        res.status(200).json({message:"successful"})
      } catch (error) {
        console.error(error)
      }
   } 
   else{
    return res.status(403).json({message:"method not allowed"})
   }

}

export default handler