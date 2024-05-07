const BASE_URL = 'http://localhost:3000/';

// TODO: get token from cookie or localStorage
async function getApi(endpoint) {
    try {
        let response = await fetch(`${BASE_URL}api/${endpoint}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjY2MzYzYmYzYTkzNjRlOGE4NzNjNDhmOSIsImVtYWlsIjoibG9wcmlvcmVmZWRlcmljbzFAZ21haWwuY29tIn0sImV4cCI6MTcxNTE5MzI5ODIyMywiaWF0IjoxNzE1MTA2ODk4fQ.Dr7IrHyzGkaZpN3t5vfNyFTy153bDG5B-05QdEppyRg'
                //'token': localStorage.getItem('token')
            },
        });
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
    }
}

export default getApi;