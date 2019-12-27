import { userService } from './user.service'
export const createService = {
    createProduct,
    editProduct,
    uploadImageProduct
};

function createProduct(product){
  return post(process.env.REACT_APP_CREATE_PRODUCT_DOMAIN, product)
}

function editProduct(product){
  return post(process.env.REACT_APP_EDIT_PRODUCT_DOMAIN, product)
}

function uploadImageProduct(image){
  console.log('image', image)
  return post(process.env.REACT_APP_UPLOAD_IMAGE_PRODUCT_DOMAIN, image)
}

function post(url,json){
  const oauth2 = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;
  console.log()
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': oauth2,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Access-Control-Allow-Credentials': true
      },
      // mode: 'no-cors',
      // body: JSON.stringify(json)
      body: json
  };

  console.log(url, requestOptions)
  return fetch(url, requestOptions)
        .then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
            }
            return Promise.reject(response.status);
        }

        return data;
    });
}
