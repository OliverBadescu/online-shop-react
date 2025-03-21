function api(path, method = 'GET', body = null) {
    const url = `http://www.localhost:8080/category/${path}`;
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

        
        if (response.status === 200 || response.status === 202 || response.status === 201) {
            return {
                success: true,
                status: response.status,
                body: data
            };
        }

        
        const errorMessage = (data && data.message) || response.statusText || 'Request failed';
        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
    } catch (error) {
        return {
            success: false,
            status: error.status || 500,
            message: error.message || 'Something went wrong',
        };
    }
}

  export function getAllCategories(){
    return request('getAll', 'GET');
  }

  export function addCategory(data){
    return request('addCategory', 'POST', data);
  }

  export function deleteCategory(id){
    return request(`deleteCategory/${id}`, 'DELETE')
  }

  export function updateCategory(id, data){
    return request(`updateCategory/${id}`, 'PUT', data);
  }

  export function addSubcategory(id, data){
    return request(`addSubcategory/ ${id}`, 'POST', data);
  }