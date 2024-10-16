import Users from "../../../model/userSchema"
import ConnectDB from "@/utils/connectDB"

async function handler(req,res){
if(req.method === 'DELETE'){
    try{
        await ConnectDB()
const foundDelete = await Users.findByIdAndDelete(req.query.delete)
if(foundDelete){
   res.status(200).json({message:"Deleted"})
}
    }
    catch(error){
console.error(error)
    }
}
}

export default handler