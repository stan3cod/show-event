import { useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./user-registration.module.css";
import data from "@/pages/api/data/countrydata";

function UserReg() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const cityInputRef = useRef();
  const countryInputRef = useRef();
  const [emailError, setEmailError] = useState("");
  const [showCity, setShowCity] = useState(" ");
  const router = useRouter();

  function showFnc() {
    setShow(!show);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredCountry = countryInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    if (enteredEmail.length < 12) {
      setEmailError("Email should be at least 12 characters long");
      return;
    }

    const data = { email: enteredEmail, password: enteredPassword,country:enteredCountry,city:enteredCity };
          // console.log(data)
    try {
      const response = await fetch("/api/user/userregistration", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setEmailError(errorData.message || "Something went wrong");
      } 
      else {
        const data = await response.json()
        console.log(data)
        setEmailError("");
        router.push('/importeduserlogin')
      }
    } catch (error) {
      setEmailError("An error occurred. Please try again.");
      console.error(error);
      // throw  error
    }
  };
  function fncCountry(e) {
    const foundCountry = data.find((el) => {
      return el.country === e.target.value;
    });

   
  }

  function getCity(e) {
    setShowCity(e.target.value);
  }
  return (
    <div className={classes.form}>
      <h1>User Registration</h1>
      <form onSubmit={submitHandler}>
        <p>{emailError}</p>
        <label htmlFor="email">Email</label>
        <div className="formControl">
          <input type="email" name="email" id="email" ref={emailRef} />
        </div>
        <label htmlFor="password">Password</label>
        <div className="formControl">
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
          />
        </div>
        <label htmlFor="country">Country</label>{" "}
        <div className={classes.select}>
          <select
            required
            name="country"
            id="country"
            ref={countryInputRef}
            onChange={fncCountry}
            readOnly
          >
            <option>--select country--</option>

            {data.map((el, i) => {
              return <option key={i}>{el.country}</option>;
            })}
          </select>
        </div>
        <div>
          <label htmlFor="city">City</label><br></br>
         
          <input
            type="text"
            name="city"
            id="city"
            required
            ref={cityInputRef}
            // onChange={(e)=>{console.log(e.target.value)}}
            onChange={getCity}
          />
        </div>
        <div className="action">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UserReg;
