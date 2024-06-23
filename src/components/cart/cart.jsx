// Import CSS modules for styling and custom product context hook
import styles1 from './cart.module.css'
import styles from "../products/products.module.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
// Import toast notification from React Toastify and useEffect hook from React
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { productSelector } from '../../redux/reducers/productReducer'
import { authSelector } from '../../redux/reducers/authReducer'
import { actions } from '../../redux/reducers/productReducer'
import { collection, addDoc, updateDoc, arrayUnion, doc, onSnapshot, arrayRemove } from "firebase/firestore";
import { ToastContainer } from 'react-toastify';

import { db } from "../firebase"
const Cart = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(authSelector)
    const { success, error, cart, orderTotal, index } = useSelector(productSelector)
    console.log('cart',cart)
    const [ loadingPurchase, setLoadingPurchase ] = useState(false)
    const [ loadingCart, setLoadingCart ] = useState(false)
   const [ cartIndex, setCartIndex ] = useState(-1)
    console.log('success',success)
    useEffect(()=>{
        if (success) {
            toast.success(success)
            dispatch(actions.clearProductNoty())
        }
        if(error){
            toast.error(error)
            dispatch(actions.clearProductNoty())
        }
        // dispatch(actions.clearNoty())
        // dispatch(actions.initializeCart(user.cart))
    },[success,error])


    async function removeCart(cartItem , index) {
        setLoadingCart(true)
        setCartIndex(index)
        const newCart = [...cart];
        // const item = { ...newCart[index] };
        
        // newCart[index] = item;
        let updatedCart = newCart.filter((item , i)=>{
            return i!=index
        })

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            cart: updatedCart
        });
        dispatch(actions.removeCart({cart:updatedCart, index,cartItem}))
        setLoadingCart(false)
        setCartIndex(-1)
    }

    function getDate() {
                // getting current date
                const date = new Date();
                // day
                let day = date.getDate();
                // month
                let month = date.getMonth() + 1;
                // year
                let year = date.getFullYear();
        
                // yy/mm/dd format
                return (`${year}-${month}-${day}`);
            }
        

    async function placeOrder(cart) {
        setLoadingPurchase(true)
        console.log('total',orderTotal)
        const currentDate = getDate();
        // adding order to database
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            orders: arrayUnion({ date: currentDate, cart, orderTotal }),
            cart : []
        });
        dispatch(actions.placeOrder({currentDate, cart, orderTotal }))
        setLoadingPurchase(false)
    }

    const increaseQty = async(cartItem, index)=>{
        // increase product quantity and update in useState
        console.log('cart',cart)
        console.log('index',index)
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
    
    }

    const decreaseQty = async(cartItem, index)=>{
        // increase product quantity and update in useState
        console.log('cart',cart)
        console.log('index',index)

        // increase itemCount 
        const newCart = [...cart];
        const item = { ...newCart[index] };
        if(item.quantity<=1){
            removeCart(item,index)
            return
        }
        item.quantity = item.quantity - 1;
        newCart[index] = item;

          // update cart in firebase database
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            cart: newCart
        });
        dispatch(actions.decreaseQty({ cart: newCart, index }));
    
    }

    // Render the Cart component
    return (<>
    <ToastContainer/>
        {/* Conditional rendering based on whether the cart is empty */}
        {cart.length == 0 ? <h1 style={{ display: 'flex', height: '100vh', alignItems: "center", justifyContent: "center" }}>Cart is Empty!</h1> :
            <div className={`${styles1.cartElement}`}>
                {/* Display total price and purchase button */}
                <div className={`${styles1.totalPrice}`}>
                    <p>
                        Total Price:- ₹{orderTotal}
                    </p>
                    <button onClick={()=>placeOrder(cart)}>
                        {loadingPurchase ? 'Purchasing' : 'Purchase'}
                    </button>
                </div>
                {/* Display cart items */}
                <div className={`${styles.productsPage}`}>
                    <div className="row mt-3">
                        <div className="offset-md-2 col-md-10 col-12">
                            <div className='row mt-3'>
                                 {/* Map through cart items */}
                                {cart.map((item, i) => {
                                    return (<div key={i} className={`col-12 col-md-3 ${styles.productContainer}`}>
                                        {/* Display product image */}
                                        <div className={`${styles.productImageContainer}`}>
                                            <img src={`${item.image}`} />
                                        </div>

                                        {/* Display product details */}
                                        <div className={`${styles.productDetails}`}>
                                            <div className={`${styles.productName}`}>
                                                <p>
                                                    {item.name}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Display product price and quantity controls */}
                                        <div className={`${styles.productPrice}`}>
                                            <p>{`₹${item.price}`}</p>
                                            <div className={`${styles1.quantityContainer}`}>
                                                {/* Quantity decrement button */}
                                                <img onClick={() => decreaseQty(item,i)} src="/images/minus.png"></img>
                                                {item.quantity}
                                                {/* Quantity increment button */}
                                                <img onClick={() => increaseQty(item,i)} src="/images/plus.png"></img>
                                            </div>
                                        </div>

                                        {/* Display remove from cart button */}
                                        <button onClick={() => removeCart(item, i)} className={`${styles1.removeBtn}`}>{(loadingCart && i == cartIndex) ? `Removing` : 'Remove From Cart'}</button>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
</>)}


// export the cart component
export default Cart