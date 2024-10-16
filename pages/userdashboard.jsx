import ConnectDB from "@/utils/connectDB";
import { signOut,useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Admin from "../model/adminSchema"
import classes from "./admindashboard.module.css";


 function UserDashboard(props) {
  const router = useRouter()
  const{data:session,status} = useSession()
  const foundAdmins = props.admins;

  if(status === "unauthenticated"){
      return (
        <div>
          <p>User is Unauthenticated</p>
        </div>
      );
  } else if (status === "loading") {
     return (
      <div>
        <p>Loading</p>
      </div>
     )
  }
  const signOuthandler = async()=>{
        await signOut({
      callbackUrl: "/importeduserlogin",
      redirect: "/importeduserlogin"
        });
  };

 const  deleteHandler = async (id)=>{
console.log(id)
const response = await fetch(`api/user/${id.toString()}`,{
method:"DELETE"
})
 const data = await response.json()
 console.log(data)
 router.push("/userdashboard")

 }

      

  return(
    
      <div className={classes.adminstyle}>
        
        <p>Dashboard</p>
      <p> {session.user?.email}</p> 
      {foundAdmins.map((admins)=>(
              <div key={admins._id} className={classes.admintable}>
                {admins.email}
                {admins.id}
                <button onClick={()=>{deleteHandler(admins.id)}}>Delete</button>
                
                

              </div>
      ))}
        <button onClick={signOuthandler}>Sign Out</button>

      </div>
      )
 }
   export default UserDashboard

   export async function getServerSideProps(){
            try{
              await ConnectDB()
              const allAdmin = await Admin.find({})
              return{
                props:{
                  admins: allAdmin.map((admins)=>({
                    id:admins._id.toString(),
                    email:admins.email,
                  })),
                },
                
                
              };


            }
     catch(error){
        console.error(error)
}

   }