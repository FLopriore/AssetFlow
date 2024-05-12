const BASE_URL = 'http://localhost:3000/';

async function getApi(endpoint) {
    try {
        let response = await fetch(`${BASE_URL}api/${endpoint}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
        });
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function postApi(endpoint, body) {
    try {
        let response = await fetch(`${BASE_URL}api/${endpoint}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: body
        });
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
    }
}

export {getApi, postApi};