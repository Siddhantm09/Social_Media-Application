## For Login API

1. Api Call in login client
2. Go to req interceptors->there is no use of request interceptors because we have'nt set access token to local storage
3. No going to middleware as not specified in the auth routes
4. Now after getting the response from controller it passes through response interceptor
5. As API gives the access token the data.status is 'ok' so we get access token in data object

## When access token is expired

1. Api call for any request will be done
2. In req interceptor the expired access token will be attached to the bearer and send to the middleware where in middleware the jwt.verify method fails returing an error in catch block
3. It will go the response interceptor where 1st if block will not be executed as data.status is not equal to 'ok' after that originalrequest will be a object with all the data of the object that contains all the information needed to make the request, including the URL, method (GET, POST, etc.), headers, and any data that needs to be sent ,where .\_retry as undefined(i.e false).
4. Now second 'if block' will be executed where .\_retry is false (i.e undefined), further new api call will be executed for the refresh token
5. Now response.data.status will be 'ok' resulting setting new AT to localStorage.
6. originalRequest.header will be updated with new AT and axios(originalRequest) will be returned which means - axios(originalRequest) is a way to make an HTTP request using the Axios library.This means that Axios will use the updated originalRequest object to make the HTTP request with the new access token and any other updated information. This allows you to essentially repeat the original request, but now with the updated credentials.

## When refresh token is expired

continue from -> When access token is expired point 5

1 Now response.data.status will not be 'ok' resulting the control going to else block, where access token will be removed from local storage
2 redirect to login page where, The '\_self' parameter specifies that it should replace the current page in the browser's history. This means that the user won't be able to navigate back to the previous page using the browser's back button.
3 return Promise.reject(error): This line rejects a Promise with the error. This is typically done in asynchronous code to indicate that an error has occurred. 4. Also after new login old cookie will be replaced by new cookie
