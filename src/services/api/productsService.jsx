function api(path, method = 'GET', body = null) {
    const url = `http://www.localhost:8080/product/${path}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
  
    if (body) {
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
        body: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Something went wrong',
      };
    }
  }


  export function getAllProducts(){
    return request('getAllProducts', 'GET');
  }

  export function totalProducts(){
    return request('totalProducts', 'GET');
  }

  export function mostSold(){
    return request('mostSold', 'GET');
  }

  export function updateProduct(id, data){
    return request(`${id}`, 'PUT', data);
  }

  export function deleteProduct(id){
    return request(`${id}`, 'DELETE');
  }