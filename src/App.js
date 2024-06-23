import './App.css';

// import Navbar from './components/navbar/navbar';
import Navbar from './components/navbar/navbar';

// import Products from './components/products/products';
import Products from './components/products/products';

// import Cart from './components/cart/cart';
import Cart from './components/cart/cart';

// import SignUp from './components/signup/signup';
import SignUp from './components/SignUp/signup';

// import Orders from './components/orders/orders';
import Orders from './components/orders/orders';

// Import necessary components from React Router for routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import SignIn from './components/SignIn/signin';
import SignIn from './components/SignIn/signin';

// import AuthProvider from './components/context/auth'
import { AuthProvider } from './components/context/auth'

import {store} from "./redux/store";

import { Provider, useDispatch } from "react-redux";

// import ProductProvider from './components/context/product'
import { ProductProvider } from './components/context/product';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from 'firebase/auth';
// import db from './components/firebase'
import {db} from "./components/firebase"

import { collection, addDoc,getDoc, updateDoc, arrayUnion, doc, onSnapshot, arrayRemove } from "firebase/firestore";
import { actions } from './redux/reducers/authReducer';
import { useEffect } from 'react';
function App() {
    return (
   
          <Provider store={store}>
          <BrowserRouter>
          {/* Include navigation bar component */}
            <Navbar />
            {/* Define routes for different paths */}
            <Routes>
              {/* Display Products component at the root path */}
              <Route path="/" element={<Products />} />
              {/* Display SignIn component at the /signin path */} 
              <Route path="/signin" element={<SignIn />} />
              {/* Display SignUp component at the /signup path */}
              <Route path="/signup" element={<SignUp />} />
              
              {/* Display Orders component at the /orders path */}
             
              <Route path="/orders" element={<Orders />} />
              {/* Display Cart component at the /cart path  */}
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </BrowserRouter>
          </Provider>
      
    );
}

// export the app component
export default App;
