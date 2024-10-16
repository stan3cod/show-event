import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ConnectDB from "@/utils/connectDB";
import User from "../model/userSchema";
import classes from "./admindashboard.module.css";

function Admindashboard(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(props);
  const foundUsers = props.users;

  if (status === "unauthenticated") {
    return (
      <div>
        <p>Admin is Unauthenticated</p>
      </div>
    );
  }
  if (status === "loading") {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  const signOuthandler = async () => {
    await signOut({
      callbackUrl: "/importedadminlogin",
      redirect: "/importedadminlogin",
    });
  };

  const deleteHandler = async (id)=>{
    console.log(id)
    const response = await fetch(`api/admin/${id.toString()}`,
{
    method:"DELETE",

   })
   const data = await response.json()
   console.log(data)
   router.push("/admindashboard")
  }

  const editHandler = (id)=>{
    router.push(`edit/${id}`)


  }


  return (
    <div className={classes.adminstyle}>
      <u>
        {" "}
        <p>Dashboard</p>
      </u>
      <p>Welcome {session.user?.email}</p>
      <table>
      {foundUsers.map((user) => (
          <div key={user.email} className={classes.admintable}>
           
              {" "}
              
      {user.email} 
          {user.country}
           {user.city}
           <button onClick={()=>{deleteHandler(user.id)}}>Delete</button>
           <button onClick={()=>{editHandler(user.id)}}>Edit</button>
         
          </div>
        ))}
      </table>

      <button onClick={signOuthandler}>Log out</button>
    </div>
  );
}

export default Admindashboard;

export async function getServerSideProps() {
  try {
    await ConnectDB();
    const allUsers = await User.find({});
    console.log(allUsers);
    return {
      props: {
        users: allUsers.map((user) => ({
          id: user._id.toString(),
          email: user.email,
          country: user.country,
          city: user.city,
        })),
      },
    };
  } catch (error) {
    console.error(error);
  }
}
