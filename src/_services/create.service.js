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
  var oauth2 = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': oauth2,
        'Access-Control-Allow-Origin': 'http://ec2-52-76-61-0.ap-southeast-1.compute.amazonaws.com',
      },
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
