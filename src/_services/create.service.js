import { userService } from './user.service'
export const createService = {
    createProduct
};

function createProduct(product){
  return post(process.env.REACT_APP_LOGIN_DOMAIN, product)
}

function post(url,json){
  var oauth2 = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': oauth2
      },
      body: JSON.stringify(json)
  };
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
