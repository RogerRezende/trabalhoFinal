import http from 'k6/http';
import { sleep, check, group } from 'k6';
import generateRandomUsername from './helpers/usernameGenerator.js';
import { login } from './helpers/login.js';
import { Trend } from 'k6/metrics';

const loginTrend = new Trend('login_duration');

export const options = {
    vus: 10,
    thresholds: { 
        http_req_duration: ['p(90)<=4']
    },
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 20 },
        { duration: '10s', target: 30 },
        { duration: '10s', target: 20 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 },
    ],
};

export default function() {
    let username = generateRandomUsername();
    let password = "Testes123";

    group('Register User', function() {
        let responseRegister = http.post(
            'http://localhost:3000/users/register', 
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
        check(responseRegister, { 'register status is 201': (responseRegister) => responseRegister.status === 201 });
    });

    group('Login User', function() {
        let responseLogin = login(username, password);
        check(responseLogin, { 'login status is 200': (responseLogin) => responseLogin.status === 200 });
        let token = responseLogin.json('token');
        loginTrend.add(responseLogin.timings.duration);
    });
    
    sleep(1);
}
