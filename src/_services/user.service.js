export const userService = {
    login,
    logout
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email":username, password })
    };
    return fetch(process.env.REACT_APP_LOGIN_DOMAIN, requestOptions)
        .then(handleResponse)
        .then(token => {
            localStorage.setItem('user', token);

            return token;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            return Promise.reject("login error");
        }

        return data;
    });
}
