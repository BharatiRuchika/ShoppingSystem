// Import CSS module for styling
import styles from "../SignIn/signin.module.css"

// Import necessary functions and hooks from libraries
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import custom authentication hook
import useAuth from "../context/auth";

// Define the SignUp component
const SignUp = () => {
    // Define state variables using useState hook
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // Destructure values from custom authentication hook
    const { signup, success, error, setSuccess } = useAuth()

    // Initialize navigation hook
    const navigate = useNavigate()
    
    // Effect to handle successful sign-up
    useEffect(()=>{
        if(success){
            // Display success message using toast
            toast.success("sign up successfully")
            // Reset success state
            setSuccess("")
            // Navigate to home page
            navigate("/")
        }
    })

    // Function to handle sign-up form submission
    const handleSignUp = async (e) => {
        e.preventDefault()
         // Call sign-up function from custom authentication hook
        signup(email,password,name)
    }
        
    // Render the sign-up form
    return <>
        <div className={`${styles.loginPageFormContainer}`}>
            <form className={`${styles.loginPageForm}`}>
                <h2 className={`${styles.loginTitle}`}>Sign Up</h2>
                
                <input type="text" name="name" value={name} placeholder="Enter Name" className={`${styles.loginInput}`} onChange={(e) => setName(e.target.value)}/>

                <input type="email" name="email"  value={email} placeholder="Enter Email" className={`${styles.loginInput}`} onChange={(e) => setEmail(e.target.value)}/>

                <input type="password" name="password" value={password} placeholder="Enter Password" className={`${styles.loginInput}`} onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit" className={`${styles.loginBtn}`} onClick={handleSignUp}>Sign Up</button>
                
                <NavLink  to="/signin" className={`${styles.signUpLink}`}>
                    <p>Or Signin instead</p>
                </NavLink>
                
            </form>
        </div>
    </>
}

// Export the SignUp component as the default export
export default SignUp