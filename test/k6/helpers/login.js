import http from 'k6/http';

function login(username, password) {
    let responseLogin = http.post(
        'http://localhost:3000/users/login', 
        JSON.stringify({ 
            username: username, 
            password: password 
        }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return responseLogin;
}

export { login };