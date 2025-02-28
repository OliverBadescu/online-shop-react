import { useState, useContext, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { getAllProducts } from "../../services/api/productsService";

export default function Home(){


    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 8;

    useEffect(() => {
        loadProducts(offset, limit);
        
    }, [offset]);

    const loadProducts = async (offset, limit) => {


        try {
            const response = await getAllProducts();
            const allProducts = response.body.list;
            const limitedProducts = allProducts.slice(offset, offset + limit);
            setProducts(limitedProducts);

            if (offset + limit >= allProducts.length) {
                document.querySelector('.show-more-button').style.display = 'none';
            }
        } catch (err) {
            console.log(err);
        }
    };

    

    const handleShowMore = () => {

        setOffset((prevOffset) => prevOffset + limit);
    };

    return (

        <>
            <div className="container">
                <div className="header-container">
                    <h1>Furniro</h1>
                    <div className="navigation-container">
                        <a href="#"><p>Home</p></a>
                        <a href="#" className="shop-link" ><p>Shop</p></a>
                        <a href="#"><p>About</p></a>
                        <a href="#"><p>Contact</p></a>
                    </div>
                    <div className="navigation-container-icons">
                        <a href="#" className="user-icon" ><i className="fa-regular fa-user"></i></a>
                        <a href="#"><i className="fa-regular fa-heart"></i></a>
                        <a href="#" className="shopping-cart-icon" ><i className="fa-solid fa-cart-shopping"></i></a>
                    </div>
                </div>

                <div className="aside-container">
                    <div className="content-container">
                        <p className="line-space">New Arrival</p>
                        <h2>Discover Our <br /> New Collection</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, obcaecati. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, suscipit.</p>
                        <button className="buy-now-btn" >BUY NOW</button>
                    </div>
                </div>

                <div className="main-container">
                    <div className="range-container">
                        <div className="title-container">
                            <h1>Browse The Range</h1>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, autem.</p>
                        </div>
                        <div className="section-container">
                            <div className="section-card dining-section">
                                <img src="assets/imgs/dining.jpg" alt="dining" className="dining-img" />
                                <p>Dining</p>
                            </div>
                            <div className="section-card living-section">
                                <img src="assets/imgs/living.jpg" alt="dining" />
                                <p>Living</p>
                            </div>
                            <div className="section-card bedroom-section">
                                <img src="assets/imgs/bedroom.jpg" alt="dining" />
                                <p>Bedroom</p>
                            </div>
                        </div>
                    </div>

                    <div className="products-container">
                        <div className="title">
                            <h1>Our Products</h1>
                        </div>
                        <div className="card-section">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        <button className="show-more-button" onClick={handleShowMore}>Show More</button>
                    </div>

                    <div className="setup-container">
                        <p>Share your setup with</p>
                        <h1>#FuniroFurniture</h1>
                        <img src="assets/imgs/setup.png" alt="" />
                    </div>
                </div>

                <div className="footer-container">
                    <hr width="100%" />
                    <div className="footer-section">
                        <div className="address-section">
                            <h4>Furniro.</h4>
                            <p className="description">400 University Drive Suite 200 Caral Gables <br /> FL 33134 USA</p>
                        </div>
                        <div className="links-section">
                            <p className="description">Links</p>
                            <a href=""><p>Home</p></a>
                            <a href=""><p>Shop</p></a>
                            <a href=""><p>About</p></a>
                            <a href=""><p>Contact</p></a>
                        </div>
                        <div className="help-section">
                            <p className="description">Help</p>
                            <a href=""><p>Payment Options</p></a>
                            <a href=""><p>Returns</p></a>
                            <a href=""><p>Privacy Policies</p></a>
                        </div>
                        <div className="newsletter-section">
                            <p className="description">Newsletter</p>
                            <input type="email" name="email" id="newsletter-email" placeholder="Enter your email address" />
                            <button className="newsletter-button">SUBSCRIBE</button>
                        </div>
                    </div>
                    <hr width="80%" />
                    <div className="end-section">
                        <p>2025 furino. All rights reserved</p>
                    </div>
                </div>
            </div>
        </>
    );

}