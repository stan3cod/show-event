import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // credentials is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the credentials object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const { email, password,role} = credentials
          const response = await fetch('http://localhost:3000/api/LoginCode/LoginLogic', {
            method: 'POST',
            body: JSON.stringify({ email, password,role}),
            headers: {
              'Content-type': 'application/json'
            },
  
          });
          if(!response.ok){
            throw new Error('Password Or Email is not Correct')
        }
        let user = await response.json()

        if(response.ok && user) {
          return user;
        } else return null;
      } catch (error) {
        console.log(error.message)
        return;
      }
     

    },
  }),


],

callbacks: {
  async jwt({ token, user }) {
      return { ...token, ...user };
  },
  async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      return session;
  },
},
jwt: {
  secret: 'hahharrr^^^^908765',
  encryption: true,
},

};

export default NextAuth(authOptions)





// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     // ...add more providers here
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: "Credentials",
//       // credentials is used to generate a form on the sign in page.
//       // You can specify which fields should be submitted, by adding keys to the credentials object.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: { label: "email", type: "email", placeholder: "jsmith" },
//         password: { label: "password", type: "password" }
//       },
//       async authorize(credentials, req) {
//         try {
//           const { email, password} = credentials
//           const response = await fetch('http://localhost:3000/api/user/userLogin', {
//             method: 'POST',
//             body: JSON.stringify({ email, password}),
//             headers: {
//               'Content-type': 'application/json'
//             },
  
//           });
//           if(!response.ok){
//             throw new Error('Password Or Email is not Correct')
//         }
//         let user = await response.json()

//         if(response.ok && user) {
//           return user;
//         } else return null;
//       } catch (error) {
//         console.log(error.message)
//         return;
//       }
     

//     },
//   }),


// ],

// callbacks: {
//   async jwt({ token, user }) {
//       return { ...token, ...user };
//   },
//   async session({ session, token, user }) {
//       // Send properties to the client, like an access_token from a provider.
//       session.user = token;
//       return session;
//   },
// },
// jwt: {
//   secret: 'hahharrr^^^^908765',
//   encryption: true,
// },
// pages:{
//     signIn: "../../user-login"
//     }
// };

// export default NextAuth(authOptions)


// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     // ...add more providers here
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: "Credentials",
//       // credentials is used to generate a form on the sign in page.
//       // You can specify which fields should be submitted, by adding keys to the credentials object.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: { label: "email", type: "email", placeholder: "jsmith" },
//         password: { label: "password", type: "password" }
//       },
//       async authorize(credentials, req) {
//         try {
//           const { email, password} = credentials
//           const adminresponse = await fetch('http://localhost:3000/api/admin/adminLogin', {
//             method: 'POST',
//             body: JSON.stringify({ email, password}),
//             headers: {
//               'Content-type': 'application/json'
//             },
  
//           });
//           const userresponse = await fetch('http://localhost:3000/api/user/userLogin', {
//             method: 'POST',
//             body: JSON.stringify({ email, password}),
//             headers: {
//               'Content-type': 'application/json'
//             },
  
//           });
//           if(!adminresponse.ok){
//             throw new Error('Password Or Email is not Correct')
//         }
//           if(!userresponse.ok){
//             throw new Error('Password Or Email is not Correct')
//         }
//         let user = await adminresponse.json()
//         let userii = await userresponse.json()

//         if(adminresponse.ok && user) {
//           return user;
//         } else  if(userresponse.ok && userii) {
//           return userii;
//         } else return null;
        
     
//       } catch (error) {
//         console.log(error.message)
//         return;
//       }
     

//     },
//   }),


// ],

// callbacks: {
//   async jwt({ token, user }) {
//       return { ...token, ...user };
//   },
 
//   async session({ session, token, user }) {
//       // Send properties to the client, like an access_token from a provider.
//       session.user = token;
//       return session;
//   },
 
// },
// jwt: {
//   secret: 'hahharrr^^^^908765',
//   encryption: true,
// },
// pages:{
//     signIn: "../../user-login"
//     }
// };

// export default NextAuth(authOptions)


