import {request} from "./api-utils.jsx";


const baseUrl ="cart/";

export async function getCartByUserId() {
    return request(baseUrl +`getCart`, 'GET');
}

export async function deleteProductFromCart(productId) {
    return request(baseUrl +`deleteProductFromCart/product/${productId}`, 'DELETE');
}

export async function addProductToCart( product) {
    return request(baseUrl +`addProductToCart`, 'POST', product);
}

export async function updateCartQuantity( productId, quantityRequest) {
    return request(baseUrl +`updateProductQuantity/products/${productId}`, 'PUT', quantityRequest);
}

export async function clearUserCart(){
    return request(baseUrl +`emptyUserCart`, 'DELETE',null);
}