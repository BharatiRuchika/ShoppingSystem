// Import CSS module for styling
import styles from './navbar.module.css'

// Import custom authentication context hook and NavLink from React Router
import useAuth from '../context/auth'
import { NavLink } from 'react-router-dom'

// Define the Navbar component
const Navbar = () => {
    // Destructure values from custom authentication context hook
    const { user, success, error, logOut, setSuccess } = useAuth()

     // Render the Navbar component
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
                                    <img src="https://bharatiruchika.github.io/images/home.png"></img>
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
                                    <img src="https://bharatiruchika.github.io/images/orders.png"></img>
                                </span>
                                My Orders
                            </NavLink>
                        </li>
                        {/* Cart link */}
                        <li className='nav-item active'>
                                <NavLink to="/cart" className={`${styles.navLinks}`}>
                                    <span>
                                        <img src="https://bharatiruchika.github.io/images/cart.png"></img>
                                    </span>
                                    Cart
                                </NavLink>
                            </li>
                            
                            {/* Logout link */}
                            <li className='nav-item active'>
                                <NavLink  to="/" onClick={logOut} className={`${styles.navLinks}`}>
                                    <span>
                                        <img src="https://bharatiruchika.github.io/images/orders.png"></img>
                                    </span>
                                    Logout
                                </NavLink>
                            </li></>) : (
                             // Login link
                            <li className={`${styles.navLinks}`}>
                                <NavLink to="/signin" className={`${styles.navLinks}`}>
                                    <span>
                                        <img src="https://bharatiruchika.github.io/images/home.png"></img>
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