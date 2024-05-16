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

// import ProductProvider from './components/context/product'
import { ProductProvider } from './components/context/product';

// import db from './components/firebase'
import {db} from "./components/firebase"

function App() {
    return (
      <AuthProvider>
         {/* Provide product context to all components within ProductProvider  */}
        <ProductProvider>
          {/* Set up client-side routing */}
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
        </ProductProvider>
      </AuthProvider>
    );
}

// export the app component
export default App;
