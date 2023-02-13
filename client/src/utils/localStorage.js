export const KEY_ACCESS_TOKEN = 'access_token'

//check if logged in or not
export const getItem = (key) => {
    return localStorage.getItem(key)
}

//save access token after login
export const setItem = (key, value) => {
    return localStorage.getItem(key, value)
}

//logout
export const removeItem = (key) => {
    return localStorage.removeItem(key)
}

