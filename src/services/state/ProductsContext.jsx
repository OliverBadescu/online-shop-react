import { createContext,useState, useEffect } from "react";
import { getAllProducts } from "../api/productsService";


export const ProductContext= createContext();

export function ProductProvider({ children }){


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleFetchProducts = async () => {

        setLoading(false);

        try {
            const response = await getAllProducts();
            const allProducts = response.body.list;
            setProducts(allProducts);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }

    }
    useEffect(() => {
        handleFetchProducts();
    }, []);



    const contextValue = {
        products
    };

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );

}