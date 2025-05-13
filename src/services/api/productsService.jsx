import { request } from "./api-utils";

const baseUrl = "product/";

export function getAllProducts(){
  return request(baseUrl +'getAllProducts', 'GET');
}

export function totalProducts(){
  return request(baseUrl +'totalProducts', 'GET');
}

export function mostSold(){
  return request(baseUrl +'mostSold', 'GET');
}

export function updateProduct(id, data){
  return request(baseUrl +`${id}`, 'PUT', data);
}

export function deleteProduct(id){
  return request(baseUrl +`${id}`, 'DELETE');
}

export function addProduct(data ){
  return request(baseUrl +'addProduct', 'POST', data);
}