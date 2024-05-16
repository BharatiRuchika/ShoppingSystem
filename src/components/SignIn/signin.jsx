// Import CSS module for styling
import styles from "./signin.module.css"

// Import necessary functions and hooks from libraries
import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import useAuth from "../context/auth";
import { useNavigate } from "react-router-dom";

// Define the SignIn component
const SignIn = () => {
    // Define state variables using useState hook
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

     // Destructure values from custom authentication hook
    const { login, success, error, setSuccess } = useAuth()

    // Initialize navigation hook
    const navigate = useNavigate()

    // Effect to handle successful sign-in
    useEffect(()=>{
        if(success){
            // Display success message using toast
            toast.success(success)
            // Navigate to home page
            navigate("/")
            // Reset success state
            setSuccess("")
        }
    })
    
    // Function to handle sign-in form submission
    const handleSignIn = (e) => {
        e.preventDefault()
         // Call sign-in function from custom authentication hook
        login(email,password)
    }


    // Render the sign-in form
    return (<>
        <div className={`${styles.loginPageFormContainer}`}>
            <form className={`${styles.loginPageForm}`}>
                <h2 className={`${styles.loginTitle}`}>Sign In</h2>
                
                <input type="email" name="email" placeholder="Enter Email" className={`${styles.loginInput}`} onChange={(e) => setEmail(e.target.value)}/>

                <input type="password" name="password" placeholder="Enter Password" className={`${styles.loginInput}`} onChange={(e) =>setPassword(e.target.value)}/>

                <button type="submit" onClick={handleSignIn} className={`${styles.loginBtn}`}>
                Sign In</button>

                {error && <p>{error}</p>}
                
                <NavLink to="/signup" className={`${styles.signUpLink}`}>
                    <p>Or Signup instead</p>
                </NavLink>
                
            </form>
        </div>
    </>)
}

// Export the SignIn component as the default export
export default SignIn