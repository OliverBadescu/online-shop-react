import { request } from "./api-utils";

const baseUrl = "category/";

  export function getAllCategories(){
    return request(baseUrl +'getAll', 'GET');
  }

  export function addCategory(data){
    return request(baseUrl +'addCategory', 'POST', data);
  }

  export function deleteCategory(id){
    return request(baseUrl +`deleteCategory/${id}`, 'DELETE')
  }

  export function updateCategory(id, data){
    return request(baseUrl +`updateCategory/${id}`, 'PUT', data);
  }

  export function addSubcategory(id, data){
    return request(baseUrl +`addSubcategory/ ${id}`, 'POST', data);
  }