import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { ProductCardContext } from '../../services/state/productCardContext';
import { useContext } from 'react';
import test from '../../assets/imgs/test.jpg';
import { addProductToCart } from '../../services/api/cartService';
import { UserContext } from '../../services/state/UserContext';
import { Alert } from 'antd';
import { ProductContext } from '../../services/state/ProductsContext';

export default function ProductPage() {
    const { user } = useContext(UserContext);
    const { product } = useContext(ProductCardContext); 
    const [error, setError] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const [offset, setOffset] = useState(0);
    const limit = 3;
     
    const { products } = useContext(ProductContext); 


    const handleInputChange = (e) => {
        const { value } = e.target;
        setQuantity(Number(value));
    };

    const handleAddToCart = async () => {
        setError(true);

        const cartRequest = {
            productId: product.id,
            quantity: quantity 
        };

        let data = await addProductToCart(user.id, cartRequest);

        if (data) {
            setError(false);
        } else {
            setError(true);
        }
    };
    const handleShowMore = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    return (
        <>
            {!error && (
                <Alert
                    className="alert-container-login"
                    message="Success"
                    description={"Product added to cart successfully"}
                    type="success"
                    showIcon
                    closable
                />
            )}
            <div className="header-container">
                <h1>Furniro</h1>
                <div className="navigation-container">
                    <Link to={'/home'} className="home-link">
                        <p>Home</p>
                    </Link>
                    <Link to={'/shop'} className="shop-link"><p>Shop</p></Link>
                    <a href="#">
                        <p>About</p>
                    </a>
                    <a href="#">
                        <p>Contact</p>
                    </a>
                </div>
                <div className="navigation-container-icons">
                    <a href="#" className="user-icon">
                        <i className="fa-regular fa-user" />
                    </a>
                    <a href="#">
                        <i className="fa-regular fa-heart" />
                    </a>
                    <Link to={'/cart'} className="shopping-cart-icon"><i className="fa-solid fa-cart-shopping"></i></Link>
                </div>
            </div>
            <div className="aside-container-product-page">
                <p className="grey-text">Home</p>
                <i className="fa-solid fa-arrow-right" />
                <p className="grey-text">Shop</p>
                <i className="fa-solid fa-arrow-right" />
                <p className="product-name-aside-container">
                    {product.name}
                </p>
            </div>
            <div className="main-container-product-page">
                <div className="product-pictures-container">
                    <div className="select-images">
                        <a href="#">
                            <img src={"asseta"} alt="" />
                        </a>
                        <a href="#">
                            <img src={test} alt="" />
                        </a>
                        <a href="#">
                            <img src={test} alt="" />
                        </a>
                        <a href="#">
                            <img src={test} alt="" />
                        </a>
                    </div>
                    <div className="main-image">
                        <img src={test} alt="" />
                    </div>
                </div>
                <div className="product-info-container">
                    <h1 className="product-name-main">
                        {product.name}
                    </h1>
                    <p className="grey-text product-price">
                        ${product.price}
                    </p>
                    <p className="product-description">
                        {product.description}
                    </p>
                    <div className="add-to-cart-product-page">
                        <input
                            type="number"
                            name="quantity"
                            id="quantity-product-page"
                            onChange={handleInputChange}
                            value={quantity} 
                            min={1}
                            max={99}
                        />
                        <button className="add-to-cart-product-page-button" onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                    <hr className="hr-product-page" />
                    <div className="product-category">
                        <p>SKU: SS001</p>
                        <p>Category: Sofas</p>
                    </div>
                </div>
            </div>
            <div className="additional-information">
                <hr className="additional-information-hr" />
                <div className="titles">
                    <a href="#">Description</a>
                    <a href="#">Additional Information</a>
                </div>
                <div className="description-additional-info">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe sunt
                        quidem nisi, natus eius optio veritatis impedit, quis in nesciunt
                        deleniti esse, ratione ipsum enim fugiat ea officiis similique odit
                        sequi eum! Praesentium pariatur itaque aut quos. Numquam placeat <br />{" "}
                        <br /> sunt adipisci ducimus, distinctio provident architecto expedita
                        aliquid iure? Suscipit dicta numquam voluptate quaerat, ipsam
                        perferendis. Maxime rerum molestias maiores delectus, dignissimos
                        deleniti soluta aut omnis commodi tempora fugit nostrum, sapiente quae
                        saepe, distinctio enim laboriosam possimus odio! Quod architecto eaque
                        facilis nihil illo aut aperiam cumque expedita exercitationem. Dolores
                        temporibus aspernatur voluptas quas, placeat sapiente facilis
                        voluptatibus doloremque dolorem nulla.
                    </p>
                </div>
                <div className="additional-information-imgs">
                    <img src="assets/imgs/sofa.jpg" alt="" />
                    <img src="assets/imgs/sofa.jpg" alt="" />
                </div>
                <hr className="additional-information-hr" />
            </div>
            <div className="related-products-container products-container">
                <h1>Related Products</h1>
                <div className="card-section-product-page">
                    {products.slice(0, offset + limit).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <button className="show-more-button" onClick={handleShowMore}>Show More</button>
            </div>
            <div className="footer-container">
                <hr width="100%" />
                <div className="footer-section">
                    <div className="address-section">
                        <h4>Furniro.</h4>
                        <p className="description">
                            400 University Drive Suite 200 Caral Gables <br />
                            FL 33134 USA
                        </p>
                    </div>
                    <div className="links-section">
                        <p className="description">Links</p>
                        <a href="">
                            <p>Home</p>
                        </a>
                        <a href="">
                            <p>Shop</p>
                        </a>
                        <a href="">
                            <p>About</p>
                        </a>
                        <a href="">
                            <p>Contact</p>
                        </a>
                    </div>
                    <div className="help-section">
                        <p className="description">Help</p>
                        <a href="">
                            <p>Payment Options</p>
                        </a>
                        <a href="">
                            <p>Returns</p>
                        </a>
                        <a href="">
                            <p>Privacy Policies</p>
                        </a>
                    </div>
                    <div className="newsletter-section">
                        <p className="description">Newsletter</p>
                        <input
                            type="email"
                            name="email"
                            id="newsletter-email"
                            placeholder="Enter your email address"
                        />
                        <button className="newsletter-button">SUBSCRIBE</button>
                    </div>
                </div>
                <hr width="80%" />
                <div className="end-section">
                    <p>2025 furino. All rights reserved</p>
                </div>
            </div>
        </>
    );
}