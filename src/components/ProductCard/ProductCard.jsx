import React from 'react';
import image from  '../../assets/imgs/test.jpg'

export default function ProductCard({product}){

    return (

        <>
            <div className="product-card">
                <img src={image} alt={product.name} />
                <p>{product.name}</p>
                <p className="description">{product.description}</p>
                <p>${product.price}</p>
                <button className="add-to-cart" data-id={product.id}>Add to cart</button>
            </div>
        </>
    );


}