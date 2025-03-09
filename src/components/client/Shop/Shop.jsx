import { useState, useEffect, useContext } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { getAllProducts } from "../../../services/api/productsService";
import { UserContext } from "../../../services/state/UserContext";
import { useNavigate, Link } from 'react-router-dom';
import { ProductContext } from "../../../services/state/ProductsContext";


export default function Shop(){

    const { user } = useContext(UserContext);

    const { products } = useContext(ProductContext); 


    return (

        <>
            <div className="header-container">
                <h1>Furniro</h1>
                <div className="navigation-container">
                <Link to={'/home'} className="home-link">
                    <p>Home</p>
                </Link>
                <a href="#">
                    <p>Shop</p>
                </a>
                <a href="#">
                    <p>About</p>
                </a>
                <a href="#">
                    <p>Contact</p>
                </a>
                </div>
                <div className="navigation-container-icons">
                <Link to={'/account'} className="user-icon"><i className="fa-regular fa-user"></i></Link>
                <a href="#">
                    <i className="fa-regular fa-heart" />
                </a>
                <Link to={'/cart'} className="shopping-cart-icon"><i className="fa-solid fa-cart-shopping"></i></Link>
                </div>
            </div>
            <div className="aside-container-shop">
                <div className="shop-container">
                <h1>Shop</h1>
                <p>
                    <b>Home &gt;</b> Shop
                </p>
                </div>
            </div>
            <div className="filter-container">
                <div className="filter-container right-side">
                <a href="#" className="filter-button">
                    <i className="fa-solid fa-sliders" />
                </a>
                <p>Filter</p>
                <p className="result-text">Showing 1-16 of 32 results</p>
                </div>
                <div className="filter-container left-side">
                <p>Sort By</p>
                <select name="sort" id="sort-by-select" className="drop-down-select">
                    <option value="price-ascending">Default</option>
                    <option value="price-ascending">Price ascending</option>
                    <option value="price-ascending">Price descending</option>
                </select>
                </div>
            </div>
            <div className="products-container-shop">
                <div className="card-section">

                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="pages-section">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn next-btn">Next</button>
                </div>
            </div>
            <div className="info-container-cart-shop">
                <div className="card-info">
                <i className="fa-solid fa-trophy" />
                <div className="text-section-info">
                    <p>High Quality</p>
                    <p className="description-text">crafted from top materials</p>
                </div>
                </div>
                <div className="card-info">
                <i className="fa-solid fa-check" />
                <div className="text-section-info">
                    <p>Warranty Protection</p>
                    <p className="description-text">Over 2 years</p>
                </div>
                </div>
                <div className="card-info">
                <i className="fa-solid fa-truck-fast" />
                <div className="text-section-info">
                    <p>Free Shipping</p>
                    <p className="description-text">Order over $150</p>
                </div>
                </div>
                <div className="card-info">
                <i className="fa-solid fa-headset" />
                <div className="text-section-info">
                    <p>24 / 7 Support</p>
                    <p className="description-text">Dedicated support</p>
                </div>
                </div>
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