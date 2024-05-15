const BASE_URL = 'http://localhost:3000/';

async function getApi(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}api/${endpoint}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            },
        });
        const content = await response.json();

        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${content.message}`);
        }

        return content;
    } catch (e) {
        throw new Error(`${e.message}`);
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
            body: JSON.stringify(body)
        });
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function putApi(endpoint, body) {
    try {
        let response = await fetch(`${BASE_URL}api/${endpoint}`, {
            method: 'put',
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

export {getApi, postApi, putApi};