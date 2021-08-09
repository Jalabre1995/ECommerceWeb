import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './Product/Product';
const products = [
    {id: 1, name: 'Shoes', description: 'Running Shoes.', price: '$5', image: "https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {id: 2, name: 'MacBook', description: 'Apple macbook.', price: '$10', image: "https://images.pexels.com/photos/4049206/pexels-photo-4049206.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},

]

const Products = () => {
    return (

    
    <main>
        <Grid container justify="center" spacing={4}>
            {products.map((product) => (
                <Grid item key ={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product ={product}/>
                </Grid> 
            ))}

        </Grid>
    </main>
    );
}

export default Products