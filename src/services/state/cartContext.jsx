import { createContext, useState } from "react";
import { getCartByUserId } from "../api/cartService";

export const CartContext = createContext();

export default function CartProvider({children}){



    const [cart, setCart] = useState([]);


    
    const contextValue = {
        cart
    };

    return(
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );

}