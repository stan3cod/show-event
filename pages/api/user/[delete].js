import Admin from "../../../model/adminSchema"
import ConnectDB from "@/utils/connectDB"

async function handler(req,res){
if(req.method === "DELETE"){
try{
    ConnectDB()
    const foundDelete = await Admin.findByIdAndDelete(req.query.delete)
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