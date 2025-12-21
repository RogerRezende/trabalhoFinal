import http from 'k6/http';
import { sleep, check } from 'k6';
import { login } from './helpers/login.js';
import generateRandomUsername from './helpers/usernameGenerator.js';
import { SharedArray } from 'k6/data';

export const options = {
    vus: 1,
    duration: '20s',
    thresholds: { 
        http_req_duration: ['p(90)<=5']
    }
};

const data = new SharedArray('users', function() {
    return JSON.parse(open('./data/login.data.json'));
});

export default function() {
    const user = data[__VU % data.length];
    let responseLogin = login(user.username, user.password);
    check(responseLogin, { 'login status is 200': (responseLogin) => responseLogin.status === 200 });
    let token = responseLogin.json('token');
    let comic = generateRandomUsername();

    let responseComics = http.post(
        'http://localhost:3000/comics/register', 
        JSON.stringify({ 
            name: comic, 
            publisher: "Panini Comics",
            licensor: "DC Comics",
            genre: "Super Heróis",
            price: 22.90
        }),
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    check(responseComics, { 'register comic status is 201': (responseComics) => responseComics.status === 201 });

    sleep(1);
}
