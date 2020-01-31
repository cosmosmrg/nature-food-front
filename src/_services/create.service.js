import { userService } from './user.service'
const axios = require('axios');

export const createService = {
    createProduct,
    editProduct,
    uploadImageProduct,
    approvalProduct,
    updateOrderStatus,
    updateSlip,
    transferMoney
};

function post(url,json) {
  const oauth2 = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;

  const requestOptions = {
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': oauth2,
      },
      data: json
  };
  return axios(requestOptions)
  .then(res => {
    return res
  })
  .catch(error => {
    if (error.response.status === 401) {
      userService.logout();
    }
    throw new Error(error.response.data)
  })
}

// Product
function createProduct(product){
  return post(process.env.REACT_APP_CREATE_PRODUCT_DOMAIN, product)
}

function editProduct(product){
  return post(process.env.REACT_APP_EDIT_PRODUCT_DOMAIN, product)
}

function approvalProduct(productId){
  return post(process.env.REACT_APP_POST_APPROVE_PRODUCTS_DOMAIN, productId)
}

function uploadImageProduct(image){
  return post(process.env.REACT_APP_UPLOAD_IMAGE_PRODUCT_DOMAIN, image)
}

function updateOrderStatus(obj){
  return post(process.env.REACT_APP_UPDATE_ORDER_STATUS_DOMAIN, obj)
}

function updateSlip(obj){
  return post(process.env.REACT_APP_POST_UPDATE_SLIP_DOMAIN, obj)
}

function transferMoney(userId,balance) {
  const oauth2 = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;
  const url = process.env.REACT_APP_POST_TRANSFER_MONEY + `?id=${userId}&balance=${balance}`
  const requestOptions = {
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': oauth2,
      }
  };
  return axios(requestOptions)
  .then(res => {
    return res
  })
  .catch(error => {
    if (error.response.status === 401) {
      userService.logout();
    }
    throw new Error(error.response.data)
  })
}
