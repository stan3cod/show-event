import { useRef, useState } from "react";
import { useRouter } from "next/router"
import classes from "./adminregistration.module.css"

function Admin() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null)
    const [emailError, setEmailError] = useState("");
    const router = useRouter()

    const submitHandler = async (e) => {
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        if (enteredEmail.length < 12) {
            setEmailError("Email should be at least 12 characters long");
            return;
        }

        const data = { email: enteredEmail,password:enteredPassword};

        try {
            const response = await fetch('/api/admin/adminregistration', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                setEmailError(errorData.message || 'Something went wrong');
            } else {
                setEmailError(""); // Clear the error if successful
                router.push('/importedadminlogin')
            }
        } catch (error) {
            setEmailError("An error occurred. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className={classes.form}>
            <h1>Admin Registration</h1>
            <form onSubmit={submitHandler}>
                <p>{emailError}</p>
                <label htmlFor="email">Email</label>
                <div className="formControl">
                    <input type="email" name="email" id="email" ref={emailRef}/>
                </div>
                <label htmlFor="password">Password</label>
                <div className="formControl">
                    <input type="password" name="password" id="password" ref={passwordRef} />
                </div>
                <div className="action">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Admin;