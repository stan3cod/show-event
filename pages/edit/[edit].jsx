
// import ConnectDB from "@/utils/connectDB";
// import Admin from "../../model/adminSchema"
// // import {objectId} from "mongodb"


// function UserEdit(props) {
//     console.log(props)
//   return (

//     <div>
     
//       <p>Edit</p>
//     </div>
//   );
// }
// export default UserEdit;


// export async function getStaticPaths(){
// await ConnectDB()

// const UserId = await Admin.find({},{_id:1}).lean()
// // console.log(UserId)
// return{
//     fallback:"blocking",
//     paths:UserId.map((el)=>({
//         params:{edit:el._id.toString()}

//     }))
// }


// }

// export async function getStaticProps(context){
// const edit = context.params.edit
// console.log("This is the Edit",edit)
// await ConnectDB()
// const selectedAdmin = await Admin.findOne({edit:_id})
// console.log("This is SelectedAdmin",selectedAdmin)
// const Admindata =  {
//     id:selectedAdmin._id.toString(),
//     email:selectedAdmin.email,
//     country:selectedAdmin.country,
//     city:selectedAdmin.city
//  }
// return{
//     props:{
//         Admindata
//     }


// }
   

// }

//  import ConnectDB from "@/utils/connectDB";
//  import Admin from "../../model/adminSchema";

//  function UserEdit({ Admindata }) {
//     return (
//       <div>
//         <p>Edit</p>
//         <p>Email: {Admindata.email}</p>
//         <p>Country: {Admindata.country}</p>
//         <p>City: {Admindata.city}</p>
//       </div>
//     );
//   }
  
//   export default UserEdit;
  
//   export async function getStaticPaths() {
//     await ConnectDB();
  
//     const UserId = await Admin.find({}, { _id: 1 }).lean();
//     console.log('This is UserId',UserId)
    
//     return {
//       fallback: "blocking",
//       paths: UserId.map((el) => ({
//         params: { edit: el._id.toString() }, // Ensure this matches the dynamic segment
//       })),
//     };
//   }
  
//     export async function getStaticProps(context) {
//     const { edit } = context.params;
//     await ConnectDB();
//     console.log("This is Edit", edit)
//     console.log('typeof',(edit))
  
//     const selectedAdmin = await Admin.find({}).lean();
//     console.log("This is SelectedAdmin", selectedAdmin )
//     const foundAdmin = selectedAdmin.filter((el)=>{
//       return(
//         el._id == "66ec8297caecf2f407b67eb5"
//       )
//     })
//     console.log("This is FoundAdmin" , foundAdmin)
  
//     if (!selectedAdmin) {
//       return { notFound: true }; // Return 404 if not found
//     }
  
//     const Admindata = {
//       id: selectedAdmin._id.toString(),
//       email: selectedAdmin.email,
//       country: selectedAdmin.country,
//       city: selectedAdmin.city,
//     };
  
//     return {
//       props: {
//         Admindata,
//       },
//     };
//   }


// import ConnectDB from "@/utils/connectDB";
// import Admin from "../../model/adminSchema";

// function UserEdit({ Admindata }) {
//   return (
//     <div>
//       <h1>Edit User</h1>
//       <p>Email: {Admindata.email}</p>
//       <p>Country: {Admindata.country}</p>
//       <p>City: {Admindata.city}</p>
//     </div>
//   );
// }

// export default UserEdit;

// export async function getStaticPaths() {
//   await ConnectDB();

//   const UserIds = await Admin.find({}, { _id: 1 }).lean();
//   console.log('This is UserIds', UserIds);

//   return {
//     fallback: "blocking",
//     paths: UserIds.map((el) => ({
//       params: { edit: el._id.toString() }, })),
//   };
// }

// export async function getStaticProps(context) {
//   const { edit } = context.params;
//   await ConnectDB();
//   console.log("This is Edit", edit);

//   // Fetch the specific admin by ID
//   const foundAdmin = await Admin.findById(edit).lean();
//   console.log("This is FoundAdmin", foundAdmin);

//   if (!foundAdmin) {
//     return { notFound: true }; // Return 404 if not found
//   }

//   const Admindata = {
//     id: foundAdmin._id.toString(),
//     email: foundAdmin.email,
//     country: foundAdmin.country,
//     city: foundAdmin.city,
//   };

//   return {
//     props: {
//       Admindata,
//     },
//   };
// }


// import ConnectDB from "@/utils/connectDB";
// import Admins from "../../model/adminSchema";

// function UserEdit({ Admindata }) {
//   console.log(Admindata); // Log the fetched admin data
 
//   return (
//     <div>
//       <h1>Edit User</h1>
//       {Admindata ? (
//         <>
//           <p>Email: {Admindata.email}</p>
//           <p>Country: {Admindata.country}</p>
//           <p>City: {Admindata.city}</p>
//         </>
//       ) : (
//         <p>No admin data found.</p>
//       )}
//     </div>
//   );
// }

// export default UserEdit;

// export async function getStaticPaths() {
//   await ConnectDB();
 

//   const UserIds = await Admins.find({}, { _id: 1 }).lean();
 
//   return {
//     fallback: "blocking",
//     paths: UserIds.map((el) => ({
//       params: { edit: el._id.toString() },
//     })),
//   };
// }

// export async function getStaticProps(context) {
   
//   const {edit} = context.params; // Destructure edit from params
//   await ConnectDB();

//   console.log("This is the Edit ID:", edit);
//   const alladmin = await Admins.find({})
//   console.log('THIS IS THE ADMIN',alladmin)
  
 

//   // Find the admin by _id
//   const selectedAdmin = await Admins.find({edit:{$all:[_id.toString()]}}).lean();
//   console.log("This is SelectedAdmin", selectedAdmin);

//   if (!selectedAdmin) {
//     return { notFound: true }; // Return 404 if not found
//   }

//   const Admindata = {
//     id: selectedAdmin._id.toString(),
//     email: selectedAdmin.email,
//     country: selectedAdmin.country,
//     city: selectedAdmin.city,
//   };

//   return {
//     props: {
//       Admindata,
//     },
//   };
// }


import ConnectDB from "@/utils/connectDB";
import Admins from "../../model/adminSchema";

function UserEdit({ Admindata }) {
  console.log(Admindata); // Log the fetched admin data
 
  return (
    <div>
      <h1>Edit User</h1>
      {Admindata ? (
        <>
          <p>Email: {Admindata.email}</p>
          <p>Country: {Admindata.country}</p>
          <p>City: {Admindata.city}</p>
        </>
      ) : (
        <p>No admin data found.</p>
      )}
    </div>
  );
}

export default UserEdit;

export async function getStaticPaths() {
  await ConnectDB();
  
  const UserIds = await Admins.find({}, { _id: 1 }).lean();
  
  return {
    fallback: "blocking",
    paths: UserIds.map((el) => ({
      params: { edit: el._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const { edit } = context.params; // Destructure edit from params
  await ConnectDB();

  console.log("This is the Edit ID:", edit);

  // Find the admin by _id
  const selectedAdmin = await Admins.findById(edit).lean();

  console.log("This is SelectedAdmin", selectedAdmin);

  if (!selectedAdmin) {
    return { notFound: true }; // Return 404 if not found
  }

  const Admindata = {
    id: selectedAdmin._id.toString(),
    email: selectedAdmin.email,
    country: selectedAdmin.country,
    city: selectedAdmin.city,
  };

  return {
    props: {
      Admindata,
    },
  };
}
