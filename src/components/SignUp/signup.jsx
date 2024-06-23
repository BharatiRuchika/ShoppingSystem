// Import CSS module for styling
import styles from "../SignIn/signin.module.css"

// Import necessary functions and hooks from libraries
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { collection, addDoc , updateDoc , arrayUnion , doc , setDoc } from "firebase/firestore"; 
import {db} from "../firebase"
import { authSelector } from "../../redux/reducers/authReducer"
import { actions } from "../../redux/reducers/authReducer"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
// Import custom authentication hook
// import useAuth from "../context/auth";

// Define the SignUp component
const SignUp = () => {
    // Define state variables using useState hook
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const dispatch = useDispatch()
    // Destructure values from custom authentication hook
    const { signup, authSuccess, authError } = useSelector(authSelector)
    console.log('authError',authError)
    
    // Initialize navigation hook
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(authSuccess){
            // Navigate to home page
            navigate("/")
        }
    },[authSuccess])

    useEffect(()=>{
        if(authError){
          toast.error(authError)
          dispatch(actions.clearAuthNoty())
        }
        
    },[authError])


    // Function to handle sign-up form submission
    const handleSignUp = async (e) => {
        e.preventDefault()
         // Call sign-up function from custom authentication hook

        const auth = getAuth();
        try{
            // Create a new user with the provided email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;
            
            // Create a reference to the user document in Firestore
            const userDocRef = doc(db, "users", newUser.uid);
            const user = userCredential.user;
            // Update the user state
           
            const userData = {
                uid: user.uid,
                email : user.email,
                name: name,
                cart: [],
                orders: []
            }

            // Set the user data in Firestore
            await setDoc(userDocRef, userData);
            dispatch(actions.signup(userData))
            
            // Set success message
        }catch(error){
            // Set error message if signup fails
            console.log('error',error.message)
            dispatch(actions.error(error.message))
        }
    }
        
    // Render the sign-up form
    return <>
    <ToastContainer/>
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