import { useContext, useState } from "react";
import { UserContext } from "../../services/state/UserContext";
import { updateCartQuantity, deleteProductFromCart } from "../../services/api/cartService";

export default function CartProductCard({ product, onDelete, onQuantityUpdate }) {
    const { user } = useContext(UserContext);
    const [quantity, setQuantity] = useState(product.quantity);

    const subtotal = (product.price * quantity).toFixed(2);

    const handleInputChange = async (event) => {
        const newQuantity = parseInt(event.target.value, 10);

        if (newQuantity < 1) {
            return;
        }

        const data = await updateCartQuantity(user.id, product.productId, newQuantity);

        if (data.success) {
            setQuantity(newQuantity);
            onQuantityUpdate(product.productId, newQuantity); 
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();

        const data = await deleteProductFromCart(user.id, product.productId);

        if (data.success) {
            onDelete(product.productId); 
        }
    };

    return (
        <>
            <tr className="product-card-cart">
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                    <input
                        type="number"
                        name="number"
                        id="quantity"
                        onChange={handleInputChange}
                        defaultValue={product.quantity}
                    />
                </td>
                <td>${subtotal}</td>
                <td>
                    <a href="#" className="delete-product" onClick={handleDelete}>
                        <i className="fa-solid fa-trash" />
                    </a>
                </td>
            </tr>
        </>
    );
}