// Import CSS module for styling
import styles from "./products.module.css"

// Import necessary dependencies and custom context hook
import { data } from "../../../src/assets/data"
// import useProduct from "../context/product"
import { act, useEffect, useState } from "react"
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { actions } from "../../redux/reducers/productReducer";
import {actions as actions1} from "../../redux/reducers/authReducer"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { productSelector } from "../../redux/reducers/productReducer";
import { authSelector } from "../../redux/reducers/authReducer";
import { db } from "../firebase"
import { useNavigate } from "react-router-dom";
import { collection, addDoc,getDoc, updateDoc, arrayUnion, doc, onSnapshot, arrayRemove } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from 'firebase/auth';

// Define the Products component
const Products = () => {
    // Destructure values from custom product context hook
  
    const navigate = useNavigate()
    const { cart, success, error, total, cartCount } = useSelector(productSelector)
    // console.log('cart',cart)
   
    const { user, authSuccess, authError} = useSelector(authSelector)
   
    // console.log('user',user)
     // Initialize state variables
    const [ price, setPrice ] = useState(75000)
    const [ category, setCategory ] = useState([])
    const [ products, setProducts ] = useState(data)
    const [ search, setSearch ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [index, setIndex] = useState(-1)
    const dispatch = useDispatch()
    console.log('success',success)
    console.log('authSuccess',authSuccess)
  
    // Effect to handle successful action
    useEffect(()=>{
        if (success) {
            toast.success(success)
            dispatch(actions.clearProductNoty())
        }
        if(authSuccess){
            toast.success(authSuccess)
            dispatch(actions1.clearAuthNoty())
        }
        
        if(authError){
            toast.error(error)
            dispatch(actions1.clearAuthNoty())

        }
        if(error){
            toast.error(error)
            dispatch(actions.clearProductNoty())
        }
        // dispatch(actions.clearNoty())
        // console.log('cart',user.cart)
        // dispatch(actions.initializeCart(user.cart))
    },[dispatch,error,authError,success,authSuccess,cart])

    // Effect to filter products based on category, price, and search
    useEffect(() => {
        let products = data
     
        // Filter products based on selected categories
        if (category.length != 0) {
            products = products.filter(item => category.includes(item.category.toLowerCase()));
        }

        // Filter products based on price and search
        let newFilteredItems = products.filter(item => ((item.price <= price) && (search.toLocaleLowerCase() === ''
            ? item
            : new RegExp("\\b\\w*" + search + "\\w*\\b", "i").test(item.name))))
        
            // Update the products state
        setProducts(newFilteredItems)
    }, [category, price, search])

    // Function to handle checkbox change for category filtering
    const handleChange = (e) => {
        if (e.target.checked) {
            category.push(e.target.name)
            setCategory(() => [...category])
        } else {
            setCategory(category.filter((item) => {
                return item != e.target.name
            }))
        }
    }

    const increaseQty = async(index)=>{
        // increase product quantity and update in useState
       
        // increase itemCount 
        const newCart = [...cart];
        const item = { ...newCart[index] };
        item.quantity = item.quantity + 1;
        newCart[index] = item;

          // update cart in firebase database
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            cart: newCart
        });
        dispatch(actions.increaseQty({ cart: newCart, index }));
        setLoading(false)
    }


    const addToCart = async(product,index) => {
        if (!user) {
           
            toast.error("please first login!!")
            navigate("/signin")
            return
        }
        
        setLoading(true)
        setIndex(index)
        const i = cart.findIndex((item) => item.id === product.id);
        if (i !== -1) {
            // if product already in cart then increase quantity
            increaseQty(i);
            return;
        }
       

        // add product to the cart of loggedIn user

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            cart: arrayUnion({ quantity: 1, ...product })
        });
        dispatch(actions.addToCart({cart:product,index}))
        setLoading(false)
        setIndex(-1)
    }

    // Render the Products component
    return (<>
     <ToastContainer />
        <div className={`${styles.filterComponent}`}>
            <h2 className={`${styles.filterLabel}`}>Filter</h2>
            <form>
                <p>Price: {price}</p>
                <input value={price} onChange={(e) => setPrice(e.target.value)} className={`${styles.productRange}`} min="1" max="99991" type="range" />
                <h2>Category</h2>
                <div className={`${styles.categoryContainer}`}>
                    <div>
                        <input type="checkbox" onChange={handleChange} id="men" name="men" />
                        <label htmlFor="mensFashion"> Mens Clothing</label>
                    </div>

                    <div>
                        <input type="checkbox" onChange={handleChange} id="women" name="women" />
                        <label htmlFor="womensFashion"> Womens Clothing</label>
                    </div>

                    <div>
                        <input type="checkbox" onChange={handleChange} id="jewellery" name="jewellery" />
                        <label htmlFor="Jewellery"> jwellery </label>
                    </div>

                    <div>
                        <input type="checkbox" onChange={handleChange} id="electric" name="electric" />
                        <label htmlFor="electronics"> Electronics </label>
                    </div>
                </div>
            </form>
        </div>
        <div className={`${styles.productsPage} mt-3`}>
            <div className="row">
                <div className={`col-md-4 offset-md-4 col-12 ${styles.searchContainer}`}>
                    <input type="text" placeholder="Search By Name" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="offset-2 col-10">
                    <div className='row mt-3'>
                        {products.map((item, i) => {
                            return (
                                <div key={i} className={`col-8 col-md-3 ${styles.productContainer}`}>
                                    <div className={`${styles.productImageContainer}`}>
                                        <img src={`${item.image}`} />
                                    </div>

                                    <div className={`${styles.productDetails}`}>
                                        <div className={`${styles.productName}`}>
                                            <p>
                                                {item.name}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`${styles.productPrice}`}>
                                        <p>₹{item.price}</p>
                                    </div>

                                    <button onClick={() => addToCart(item, i)} className={`${styles.addBtn}`}>{(loading && i == index) ? 'Adding' : 'Add To Cart'}</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>)
}

// Export the Products component as the default export
export default Products