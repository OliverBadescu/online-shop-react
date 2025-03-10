function api(path, method = 'GET', body = null) {
    const url = `http://www.localhost:8080/order/${path}`;
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
  
      if (!response.ok) {
        const errorMessage =
          (data && data.message) || response.statusText || 'Request failed';
        
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

  export function addOrder(userId, orderRequest){
    return request(`${userId}`,'POST', orderRequest)
  }
  
  export function getAllCustomerOrders(userId){
    return request(`getCustomerOrders/${userId}`, 'GET');
  }

  export function getRecentOrders(){
    return request('getRecentOrders', 'GET');
  }

  export function totalOrders(){
    return request('totalOrders','GET');
  }

  export function totalRevenue(){
    return request('totalRevenue', 'GET');
  }

  export function monthly(){
    return request('monthly', 'GET');
  }