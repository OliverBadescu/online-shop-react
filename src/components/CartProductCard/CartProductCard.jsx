import { useContext, useState } from "react";
import { UserContext } from "../../services/state/UserContext";
import { updateCartQuantity, deleteProductFromCart } from "../../services/api/cartService";

export default function CartProductCard({product}){


    console.log(product);

    const { user } = useContext(UserContext);

    const [quantity, setQuantity] = useState(product.quantity);

    const subtotal = (product.price * quantity).toFixed(2);

    const handleInputChange = async (event) =>{

        const newQuantity = parseInt(event.target.value, 10);

        if(newQuantity< 1){
            return;
        }

        const request = {
            quantity: newQuantity
        }

        const data = await updateCartQuantity(user.id, product.productId, quantity);

        if(data.success){
            setQuantity(newQuantity);

        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();

        const data = deleteProductFromCart(user.id, product.productId);
    }

    return(

            <>
            {product.name}
            ${product.price}
            <input
                type="number"
                name="number"
                id="quantity"
                onChange={handleInputChange}
                defaultValue={product.quantity}
            />
            ${subtotal}
            <a href="#" className="delete-product" onClick={handleDelete}>
                <i className="fa-solid fa-trash" />
            </a>
            </>


    );


}