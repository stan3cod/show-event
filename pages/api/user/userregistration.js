import ConnectDB from "@/utils/connectDB"
import User from "../../../model/userSchema"
import bcrypt from "bcrypt"

async function handler(req,res) {
    if(req.method === "POST"){
 
       try {
         const {email,password,country,city} = req.body
         await ConnectDB()
         const foundUser =  await User.findOne({email:email})
         if(foundUser){
          return res.status(403).json({message:"User Already Exist"})
         }
         const hashedPassword = await bcrypt.hash(password,10)
         const user = new User({
          email:email,
          password:hashedPassword,
          country:country,
          city:city
         })
         await user.save()
         console.log({email,password,country,city})
         res.status(200).json({message:{email,password,country,city}})
       } catch (error) {
         console.error(error)
       }
    } 
    else{
     return res.status(403).json({message:"method not allowed"})
    }
 
 }
 
 export default handler