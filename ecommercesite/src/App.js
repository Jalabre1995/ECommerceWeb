import React, {useState, useEffect} from 'react';
import {commerce} from './lib/commerce'
import {Products, Navbar} from './Components';

const App = () => {
    const [products, setProdcuts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        //desctuctre the data from thea response//
        const {data} = await commerce.products.list();

        setProdcuts(data);
        
    }
    /// create a function to set the carts//
    const fetchCart = async() => {
        setCart(await commerce.cart.retrieve());
     
    }

    //Add to the cart///
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    }

    useEffect(() => {
        ///this is a useERffect call only run at the start///
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart);
    return (
        <div>
            <Navbar totalItems={cart.total_items}/>
            <Products products={products} onAddToCart={handleAddToCart}/>
        </div>
    )
}

export default App;
