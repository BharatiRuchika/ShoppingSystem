// import { createContext, useContext, useEffect, useState } from "react";
// import { db } from "../firebase"
// import { collection, addDoc, updateDoc, arrayUnion, doc, onSnapshot, arrayRemove } from "firebase/firestore";
// import useAuth from "./auth";
// import { toast } from "react-toastify";
// import { actions } from "../../redux/reducers/productReducer";
// // const ProductContext = createContext()

// const ProductProvider = ({ children }) => {
//     const [cart, setCart] = useState([])
//     const [orders, setOrders] = useState([])
//     const [success, setSuccess] = useState("")
//     const [error, setError] = useState("")
//     const [loading, setLoading] = useState(false)
//     const [loadingCart, setLoadingCart] = useState(false)
//     const [cartCount, setCartCount] = useState(0);
//     const [total, setTotal] = useState(0);
//     const [index, setIndex] = useState(-1);
//     const [cartIndex, setcartIndex] = useState(-1);
//     const [loadingPurchase, setLoadingPurchase] = useState(false)
//     // all products in cart
//     const { user } = useAuth();

//     useEffect(() => {
//         let sum = 0;
//         cart.map((item) => {
//             // return  Number(sum+=(item.price*item.quantity)))
//             return Number(sum += (item.price * item.quantity))
//         });
//         setTotal(sum);
//         setCartCount(cart.length);
//     })

//     useEffect(() => {
//         if (user) {
//             console.log('user',user)
//             const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
//                 // storing all the data in cart
//                 setCart(doc.data().cart);
//                 setOrders(doc.data().orders);
//             });
//         }
//     }, [user])

//     // return date in yy/mm/dd format
//     function getDate() {
//         // getting current date
//         const date = new Date();
//         // day
//         let day = date.getDate();
//         // month
//         let month = date.getMonth() + 1;
//         // year
//         let year = date.getFullYear();

//         // yy/mm/dd format
//         return (`${year}-${month}-${day}`);
//     }

//     const increaseQty = async(index)=>{
       

//         // increase product quantity and update in useState
//         cart[index].quantity++;


//         // update cart in firebase database
//         const userRef = doc(db, "users", user.uid);
//         await updateDoc(userRef, {
//             cart: cart
//         });
//         dispatch(actions.increaseQty(cart))

//         // increase itemCount and total amount

       
//     }


//     async function addToCart(product, i) {
//         if (!user) {
//             toast.error("please first login!!")
//             return
//         }
//         setLoading(true)
//         setIndex(i)
//         const index = cart.findIndex((item) => item.id === product.id);
//         if (index !== -1) {
//             // if product already in cart then increase quantity
//             increaseQty(index);
//             setSuccess("Product Quantity Increased!!");
//             return;
//         }
//         setCart((prevState) => [...prevState, { quantity: 1, ...product }])

//         // add product to the cart of loggedIn user

//         const userRef = doc(db, "users", user.uid);
//         await updateDoc(userRef, {
//             cart: arrayUnion({ quantity: 1, ...product })
//         });
//         setSuccess("Product Added to cart!!");
//         setTotal(Number(total + product.price));
//         setCartCount(cartCount + 1);
//         setLoading(false)
//         setIndex(-1)
//     }

//     // async function increaseQty(product) {
//     //     const index = cart.findIndex((item) => item.id === product.id);

//     //     // increase product quantity and update in useState
//     //     cart[index].quantity++;
//     //     setCart(cart);

//     //     // update cart in firebase database
//     //     const userRef = doc(db, "users", user.uid);
//     //     await updateDoc(userRef, {
//     //         cart: cart
//     //     });
//     //     setLoading(false)

//     //     // increase itemCount and total amount

//     //     setTotal(Number(total + cart[index].price));
//     // }

//     async function decreaseQty(product) {
//         const index = cart.findIndex((item) => item.id == product.id)
//         if (cart[index].quantity == 0) {
//             return
//         }
//         cart[index].quantity--;
//         setCart(cart);
//         const userRef = doc(db, "users", user.uid);
//         await updateDoc(userRef, {
//             cart: cart
//         });
//         // increase itemCount and total amount
//         setTotal(Number(total - cart[index].price));
//     }

//     async function removeCart(product, i) {
//         setLoadingCart(true)
//         setcartIndex(i)
//         const index = cart.findIndex((item) => item.id == product.id)
//         const userRef = doc(db, "users", user.uid);
//         await updateDoc(userRef, {
//             cart: arrayRemove(product)
//         });
//         let newCart = cart.filter((item) => item.id != product.id)
//         setCart(newCart)
//         setCartCount(cartCount - 1);
//         setTotal(Number(total - (cart[index].price * cart[index].quantity)));
//         setSuccess("Product Removed Successfully!!")
//         setLoadingCart(false)
//         setcartIndex(-1)
//     }

//     // function to remove all product from cart
//     async function clearCart() {
//         // if no item in cart then return with message
//         if (cartCount === 0) {
//             toast.error("Nothing to remove in Cart!!");
//             return;
//         }

//         // empty cart array in database
//         const userRef = doc(db, "users", user.uid);
//         await updateDoc(userRef, {
//             cart: []
//         });

//         // set item count and total amount 
//         setTotal(0);
//         setCartCount(0);
//         toast.success("Empty Cart!!");
//     }

//     async function placeOrder() {
//         setLoadingPurchase(true)
//         const currentDate = getDate();

//         // adding order to database
//         const userRef = doc(db, "users", user.uid);
//         await updateDoc(userRef, {
//             orders: arrayUnion({ date: currentDate, list: cart, amount: total })
//         });
        
//         setLoadingPurchase(false)
//         // empty cart
//         clearCart();
//     }

//     return (<>
//         <ProductContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, success, setSuccess, error, loading, setLoadingPurchase, loadingPurchase, index, orders, total, cartCount, removeCart, placeOrder, setcartIndex, loadingCart, cartIndex }}>
//             {children}
//         </ProductContext.Provider>
//     </>)
// }

// export default function useProduct() {
//     const context = useContext(ProductContext)
//     if (context == undefined) {
//         throw new Error('useProduct must be used within a productProvider');
//     }
//     return context
// }

// export { ProductProvider }