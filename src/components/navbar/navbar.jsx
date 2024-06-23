// Import CSS module for styling
import styles from './navbar.module.css'

// Import custom authentication context hook and NavLink from React Router
// import useAuth from '../context/auth'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelector } from '../../redux/reducers/authReducer'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/reducers/authReducer'
import { useEffect, useState } from 'react'
import { signOut, getAuth } from 'firebase/auth';


import { Navigate } from 'react-router-dom'
// Define the Navbar component
const Navbar = () => {
    // Destructure values from custom authentication context hook
    const { user, success, error, logout } = useSelector(authSelector)
    const navigate = useNavigate()
    

    // useEffect(()=>{
    //     if(success){
    //         toast.success(success)
    //         // dispatch(actions.clearNoty())
    //         navigate("/signin")
    //     }
    // },[success])
    
    const dispatch = useDispatch()
     // Render the Navbar component

    // Function to handle user logout
    const logOut = async() => {
        // Get the authentication instance
        const auth = getAuth();
        try {
            // Sign out the current user
            await signOut(auth);
            dispatch(actions.logout())
            
            
        } catch (error) {
            // Handle sign-out errors here
            dispatch(actions.error(error.message))
        }
    }
    return (<>
    
        {/* Navbar container */}
        <div className='row'>
            <div className={ styles.navbar }>
                 {/* Left section of the Navbar */}
                <div className='col-2'>
                    <span>Busy Buy</span>
                </div>

                 {/* Right section of the Navbar */}
                <div className='offset-4 col-6'>
                    <ul className={`${styles.navMenu}`}>
                        {/* Home link */}
                        <li className='nav-item active'>
                            <NavLink to="/" className={`${styles.navLinks} active`}>
                                <span>
                                    <img src="https://BharatiRuchika.github.io/ShoppingSystem/images/home.png"></img>
                                </span>
                                Home
                            </NavLink>
                        </li>

                        {/* Conditional rendering based on user authentication */}
                        {user ? (<>
                        {/* My Orders link */}
                        <li className='nav-item active'>
                            <NavLink to="/orders" className={`${styles.navLinks}`}>
                                <span>
                                    <img src="https://BharatiRuchika.github.io/ShoppingSystem/images/orders.png"></img>
                                </span>
                                My Orders
                            </NavLink>
                        </li>
                        {/* Cart link */}
                        <li className='nav-item active'>
                                <NavLink to="/cart" className={`${styles.navLinks}`}>
                                    <span>
                                        <img src="https://BharatiRuchika.github.io/ShoppingSystem/images/cart.png"></img>
                                    </span>
                                    Cart
                                </NavLink>
                            </li>
                            
                            {/* Logout link */}
                            <li className='nav-item active'>
                                <NavLink  to="/" onClick={()=>logOut()} className={`${styles.navLinks}`}>
                                    <span>
                                        <img src="https://BharatiRuchika.github.io/ShoppingSystem/images/orders.png"></img>
                                    </span>
                                    Logout
                                </NavLink>
                            </li></>) : (
                             // Login link
                            <li className={`${styles.navLinks}`}>
                                <NavLink to="/signin" className={`${styles.navLinks}`}>
                                    <span>
                                        <img src="https://BharatiRuchika.github.io/ShoppingSystem/images/home.png"></img>
                                    </span>
                                    Login
                                </NavLink>
                            </li>)}
                    </ul>
                    
                </div>
            </div>
        </div>
    </>)
}

// export the navbar component
export default Navbar