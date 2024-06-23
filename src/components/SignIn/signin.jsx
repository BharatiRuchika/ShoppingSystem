// Import CSS module for styling
import styles from "./signin.module.css"

// Import necessary functions and hooks from libraries
import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc , updateDoc , arrayUnion , getDoc,doc , setDoc } from "firebase/firestore"; 
import { ToastContainer, toast } from 'react-toastify';
import {db} from "../firebase"
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
// import useAuth from "../context/auth";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../../redux/reducers/authReducer"
import { actions } from "../../redux/reducers/authReducer"
import { actions as actions1 } from "../../redux/reducers/productReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// Define the SignIn component
const SignIn = () => {
    // Define state variables using useState hook
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const dispatch = useDispatch()
   
    //  // Destructure values from custom authentication hook
    const { login, authSuccess, authError, error } = useSelector(authSelector)

    // Initialize navigation hook
    const navigate = useNavigate()
    console.log('authSuccess',authSuccess)
    // Effect to handle successful sign-in
    useEffect(()=>{
        if(authSuccess){
            navigate("/")
            // Reset success state
            // dispatch(actions.clearNoty())
        }
    },[ authSuccess ])

    useEffect(()=>{
        if(authError){
          toast.error(authError)
        }
    },[ authError ])

    
    // Function to handle sign-in form submission
    const handleSignIn = async(e) => {
        e.preventDefault()
         // Call sign-in function from custom authentication hook
         const auth = getAuth();
         try {
             // Sign in the user with the provided email and password
             const userCredential = await signInWithEmailAndPassword(auth, email, password);
             // Set success message
             // setSuccess('User signed in successfully!')
             // Update the user state
             const user = userCredential.user;
            
             const userRef = doc(db, "users", user.uid);
             const userSnap = await getDoc(userRef);
             let userData = {
               ...userSnap.data()
             }
            
             dispatch(actions.login(userData))
             dispatch(actions1.initializedata({cart:userData.cart, orders: userData.orders}))
         } catch (error) {
             // Set error message if login fails
             console.log('error',error)
             dispatch(actions.error(error.message))
         }
    }


    // Render the sign-in form
    return (<>
    <ToastContainer/>
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