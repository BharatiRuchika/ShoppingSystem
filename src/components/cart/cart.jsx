// Import CSS modules for styling and custom product context hook
import styles1 from './cart.module.css'
import styles from "../products/products.module.css"
import useProduct from "../context/product"

// Import toast notification from React Toastify and useEffect hook from React
import { toast } from 'react-toastify'
import { useEffect } from 'react'
const Cart = () => {
    const { success, error, cart, total, increaseQty, decreaseQty, removeCart, setSuccess, placeOrder, index, cartIndex, loadingCart, loadingPurchase } = useProduct()
   
    useEffect(() => {
        if (success) {
            toast.success(success)
            setSuccess("")
        }
    }, [success])

    // Render the Cart component
    return (<>
        {/* Conditional rendering based on whether the cart is empty */}
        {cart.length == 0 ? <h1 style={{ display: 'flex', height: '100vh', alignItems: "center", justifyContent: "center" }}>Cart is Empty!</h1> :
            <div className={`${styles1.cartElement}`}>
                {/* Display total price and purchase button */}
                <div className={`${styles1.totalPrice}`}>
                    <p>
                        Total Price:- ₹{total}
                    </p>
                    <button onClick={placeOrder}>
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
                                                <img onClick={() => decreaseQty(item)} src="/images/minus.png"></img>
                                                {item.quantity}
                                                {/* Quantity increment button */}
                                                <img onClick={() => increaseQty(item)} src="/images/plus.png"></img>
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

    </>)
}

// export the cart component
export default Cart