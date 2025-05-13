import { request } from "./api-utils";


const baseUrl = "order/";

  export function addOrder(orderRequest){
    return request(baseUrl +`sendOrder`,'POST', orderRequest)
  }
  
  export function getAllCustomerOrders(){
    return request(baseUrl +`getCustomerOrders`, 'GET');
  }

  export function getRecentOrders(){
    return request(baseUrl +'getRecentOrders', 'GET');
  }

  export function totalOrders(){
    return request(baseUrl +'totalOrders','GET');
  }

  export function totalRevenue(){
    return request(baseUrl +'totalRevenue', 'GET');
  }

  export function monthly(){
    return request(baseUrl +'monthly', 'GET');
  }

  export function getAllOrders(){
    return request(baseUrl +'getAllOrders', 'GET');
  }

  export function deleteOrder(id){
    return request(baseUrl +`deleteOrder/${id}`, 'DELETE');
  }

  export function updateOrder(id, data){
    return request(baseUrl +`updateOrder/${id}`, 'PUT', data);
  }

  export function cancelOrder(id){
    return request(baseUrl +`cancelOrder/${id}`, 'PUT', null);
  }