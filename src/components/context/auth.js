// Import necessary dependencies from React and Firebase
import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from 'firebase/auth';
import {db} from "../firebase"
import { collection, addDoc , updateDoc , arrayUnion , doc , setDoc } from "firebase/firestore"; 
import { ToastContainer, toast } from 'react-toastify';

// Create a context for authentication
const AuthContext = createContext();

// Define the authentication provider component
const AuthProvider = ({ children }) => {
    // Initialize state variables for success message, error message, and user information
    const [ success, setSuccess ] = useState("")
    const [ error, setError ] = useState("")
    const [ user, setUser ] = useState(null);

    // Effect to listen for changes in authentication state
    useEffect(() => {
        // Get the authentication instance
        const auth = getAuth();
        // Subscribe to authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user!=null){
            // Update the user state based on the authentication state
            setUser(user);
        }
        else{
            setUser(null)
        }
        });
    })

    // Function to handle user login
    const login = async(email , password) =>{
        // Get the authentication instance
        const auth = getAuth();
        try {
            // Sign in the user with the provided email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Set success message
            setSuccess('User signed in successfully!')
            // Update the user state
            const user = userCredential.user;
            setUser(user)
            console.log('user', user)
            console.log('User ID:', user.uid);
            console.log('display name:', user.displayName);
            setSuccess('User Sign in successfully!!!')
        } catch (error) {
            // Set error message if login fails
            setError(error.message);
        }
    };

    // Function to handle user signup
    const signup = async(email, password, name) =>{
        // Get the authentication instance
        const auth = getAuth();
        try{
            // Create a new user with the provided email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;
            
            // Create a reference to the user document in Firestore
            const userDocRef = doc(db, "users", newUser.uid);
            const user = userCredential.user;
            // Update the user state
            setUser(user)
            const userData = {
                name: name,
                cart: [],
                orders: []
            }
            // Set the user data in Firestore
            await setDoc(userDocRef, userData);
            // Set success message
            setSuccess('User signed up successfully!');  
        }catch(error){
            // Set error message if signup fails
            setError(error.message);
        }
    }

    // Function to handle user logout
    const logOut = async() => {
        // Get the authentication instance
        const auth = getAuth();
        try {
            // Sign out the current user
            await signOut(auth);
        } catch (error) {
            // Handle sign-out errors here
            console.error("Error signing out:", error.message);
        }
    }

    // Provide the authentication context value to the child components
    return (
        <AuthContext.Provider value={{  login, signup, success, error, user,logOut,setSuccess }}>
         <ToastContainer />
          {children}
        </AuthContext.Provider>
      );
    };
    
    // Custom hook to access the authentication context
    export default function useAuth() {
        const context = useContext(AuthContext);
        // Ensure that the hook is used within the AuthProvider
        if (context === undefined) {
            throw new Error('useTheme must be used within a authProvider');
        }
        // Return the authentication context value
        return context;
    }

// Export the authentication provider component
export { AuthProvider };