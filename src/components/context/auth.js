// // Import necessary dependencies from React and Firebase
// import { createContext, useContext, useState, useEffect } from 'react';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from 'firebase/auth';
// import {db} from "../firebase"
// import { collection, addDoc , updateDoc , arrayUnion , doc , setDoc } from "firebase/firestore"; 
// import { ToastContainer, toast } from 'react-toastify';
// import { authSelector } from "../../redux/reducers/authReducer"
// import { actions } from "../../redux/reducers/authReducer"
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";



// // Define the authentication provider component
// const AuthProvider = ({ children }) => {
//     // Initialize state variables for success message, error message, and user information
    
//     const  { user, success, error}  = useSelector(authSelector);
//     // Effect to listen for changes in authentication state
//     useEffect(() => {
//         // Get the authentication instance
//         const auth = getAuth();
//         // Subscribe to authentication state changes
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if(user!=null){
//             // Update the user state based on the authentication state
//             setUser(user);
//         }
//         else{
//             setUser(null)
//         }
//         });
//     })

//     // Function to handle user login
//     const login = async(email , password) =>{
//         // Get the authentication instance
//         const auth = getAuth();
//         try {
//             // Sign in the user with the provided email and password
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             // Set success message
//             // setSuccess('User signed in successfully!')
//             // Update the user state
//             const user = userCredential.user;
//             dispatch(actions.login(user))
//         } catch (error) {
//             // Set error message if login fails
//             dispatch(actions.error(error.message))
//         }
//     };

//     // Function to handle user signup
//     const signup = async(email, password, name) =>{
//         // Get the authentication instance
//         console.log('email',email)
//         console.log('password',password)
//         const auth = getAuth();
//         try{
//             // Create a new user with the provided email and password
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const newUser = userCredential.user;
            
//             // Create a reference to the user document in Firestore
//             const userDocRef = doc(db, "users", newUser.uid);
//             const user = userCredential.user;
//             // Update the user state
//             dispatch(actions.signup(user))
//             const userData = {
//                 name: name,
//                 cart: [],
//                 orders: []
//             }
//             // Set the user data in Firestore
//             await setDoc(userDocRef, userData);
//             // Set success message
//         }catch(error){
//             // Set error message if signup fails
//             console.log('error',error.message)
//             dispatch(actions.error(error.message))
//         }
//     }

//     // Function to handle user logout
//     const logOut = async() => {
//         // Get the authentication instance
//         const auth = getAuth();
//         try {
//             // Sign out the current user
//             await signOut(auth);
//             dispatch(actions.logout())
//         } catch (error) {
//             // Handle sign-out errors here
//             dispatch(actions.error(error.message))
//         }
//     }

//     // Provide the authentication context value to the child components
//     return (
//         <>
//          <ToastContainer></ToastContainer>
//           {children}
//           </>
//       );
//     };
   

// // Export the authentication provider component
// export { AuthProvider };