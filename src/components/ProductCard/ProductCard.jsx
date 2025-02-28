import React from 'react';

export default function ProductCard({product}){

    return (

        <>
            <div className="product-card">
                <img src="assets/imgs/test.jpg" alt={product.name} />
                <p>{product.name}</p>
                <p className="description">{product.description}</p>
                <p>${product.price}</p>
                <button className="add-to-cart" data-id={product.id}>Add to cart</button>
            </div>
        </>
    );


}