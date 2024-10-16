import { useRef , useState} from "react"
import {signIn} from 'next-auth/react'
import { useRouter } from "next/router"
import classes from "./admin-login.module.css"



function UserLogin(){
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const[emailError, setemailError] = useState("")
    const[passError, setPassError] = useState("")
    const [userError, setUserError] = useState("")
    const router = useRouter()

      async function submitHandler(e){
           e.preventDefault()

        const enteredemail = emailInputRef.current.value
       const enteredPassword = passwordInputRef.current.value
                   
       if (enteredemail.length < 2) {
        setemailError("email should be at least 2 characters long");
        return;
    }else{
        setemailError("")
    }
    if (enteredPassword.length < 2) {
        setPassError("Password should be at least 2 characters long");
        return;
    }else{
        setPassError("")
    }

      const  sigInHandler = async () =>{
           try {
            const result = await signIn("credentials",{
                email:enteredemail,
                password:enteredPassword,
                role:"user",
                redirect: false,
                callbackUrl:"/userdashboard"
            })
            if(!result.ok){
           throw new Error("Password or email is Incorrect")
           
            }else{router.push("/userdashboard")}
           } catch (error) {
            setUserError(error.message)
            return;
           }

      }
      sigInHandler()

       }
       return(
          <div className={classes.form}>
             <h1>User Login</h1>
                     {userError}
                     <form onSubmit={submitHandler}>
                {emailError}

                <label htmlFor="email">email</label>
                <br/>
                <input type="email" name="email" id="email" ref={emailInputRef} />
              
                <div>
                    {passError}
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" name="password" id="password" ref={passwordInputRef} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>


            </form>
                  

          </div>

       )

}

  export default UserLogin