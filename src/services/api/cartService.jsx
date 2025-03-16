function api(path, method = 'GET', body = null) {
    const url = `http://www.localhost:8080/cart/${path}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
    };


    if (body != null) {
      options.body = JSON.stringify(body);
    }
  
    return fetch(url, options);
  }
  
  async function request(path, method = 'GET', body = null) {
    try {
      const response = await api(path, method, body);
      const data = await response.json().catch(() => null);
  
      if (response.status!=200) {

        const errorMessage = (data && data.message) || response.statusText || 'Request failed';
      
        let error=  new Error(errorMessage);

        error.status=response.status;

        throw error;
      }
  
      return {
        success: true,
        status: response.status,
        body: data
      };
    } catch (error) {

      
      return {
        success: false,
        status: error.status,
        message: error.message || 'Something went wrong',
      };
    }
  }


export async function getCartByUserId() {
    return request(`getCart`, 'GET');
}

export async function deleteProductFromCart(productId) {
    return request(`deleteProductFromCart/product/${productId}`, 'DELETE');
}

export async function addProductToCart( product) {
    return request(`addProductToCart`, 'POST', product);
}

export async function updateCartQuantity( productId, quantityRequest) {
    return request(`updateProductQuantity/products/${productId}`, 'PUT', quantityRequest);
}

export async function clearUserCart(){
    return request(`emptyUserCart`, 'DELETE',null);
}