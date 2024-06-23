// Import CSS module for styling
import styles from "./orders.module.css"

// Import custom product context hook
import { useSelector } from "react-redux"
import { authSelector } from "../../redux/reducers/authReducer"
import { productSelector } from "../../redux/reducers/productReducer"

// Define the Orders component
const Orders = () => {
    
    // Destructure values from custom product context hook
    const { success, error, orders } = useSelector(productSelector)
    console.log('orders',orders)
    // Render the Orders component
    return (<>
    {/* Container for orders */}
        <div className={`${styles.orderContainer}`}>
            <div className="row">
                <div className="offset-2 col-8">
                    <div className={`${styles.orderTableContainer}`}>
                         {/* Heading for orders */}
                        <h1>Your Orders</h1>
                        {/* Display each order */}
                        {orders.map((order,i)=>{
                            return (<div key={i} style={{marginTop:'5rem',textAlign:'center'}}>
                               {/* Display order details */}
                            <h2>Ordered On:- {order.date}</h2>
                            <table className={`${styles.orderTable}`}>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Display items in the order */}
                                    {order.cart.map((item)=>{
                                        return (<tr>
                                            <td> {item.name} </td>
                                            <td> {item.price} </td>
                                            <td>{item.quantity}</td>
                                            <td>₹ {item.price * item.quantity}</td>                                   
                                        </tr>)
                                    })}
                                </tbody>
                                {/* Display total amount */}
                                <tr className={`${styles.totalPrice}`}><td>₹ {order.orderTotal}</td></tr>
                            </table>
                        </div>)
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
   </>)
}

// Export the Orders component as the default export
export default Orders