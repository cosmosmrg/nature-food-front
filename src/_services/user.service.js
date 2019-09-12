export const userService = {
    login,
    logout
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "email":username, password })
    };
    return fetch(process.env.REACT_APP_LOGIN_DOMAIN, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log("user",user);
            console.log("token",JSON.stringify({"token":user}));
            localStorage.setItem('user', JSON.stringify({"token":user}));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        console.log("text",text);
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
