import { userService } from './user.service'
const axios = require('axios');

export const createService = {
    createProduct,
    editProduct,
    uploadImageProduct,
    approvalProduct
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
    if (res.status !== 200) {
      if (res.status === 401) {
        userService.logout();
      }

      console.log('res.status', res.status)

      return false
    }

    return res
  })
  .catch(error => {
    console.error(error)
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
