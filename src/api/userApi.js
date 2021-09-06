const url = "http://localhost:8080/test/user"
let authToken = sessionStorage.getItem("authentication")
let bearer = 'Bearer ' + authToken

export function fetchUser() {
    console.log("Token: " + authToken)
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': bearer
        }
    }
    return fetch(url, requestOptions).then(response => console.log(response))
}