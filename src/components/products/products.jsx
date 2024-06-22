// Import CSS module for styling
import styles from "./products.module.css"

// Import necessary dependencies and custom context hook
import { data } from "../../../src/assets/data"
import useProduct from "../context/product"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

// Define the Products component
const Products = () => {
    // Destructure values from custom product context hook
    const { cart, addToCart, success, error, loading, total, index, cartCount, setSuccess } = useProduct()

     // Initialize state variables
    const [ price, setPrice ] = useState(75000)
    const [ category, setCategory ] = useState([])
    const [ products, setProducts ] = useState(data)
    const [ search, setSearch ] = useState("")

    // Effect to handle successful action
    useEffect(() => {
        if (success) {
            toast.success(success)
            setSuccess("")
        }
    }, [success])

    // Effect to filter products based on category, price, and search
    useEffect(() => {
        let products = data
        console.log('products',products)
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

    // Render the Products component
    return (<>
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