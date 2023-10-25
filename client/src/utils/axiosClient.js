import axios from 'axios'
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from './localStorage'

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true,

})

//sending Authorization in Header with Bearer space accessToken (Authorization Token) for accessing any data (more detail in requireUser.js)
axiosClient.interceptors.request.use(
    (request) => {

        const accessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization'] = `Bearer ${accessToken}`;
        //console.log('req interceptor', request.headers.Authorization);
        return request;

    }
    //we will only get 200 OK because we are using responseWrapper.js(instead we will check the statusCode)
)


axiosClient.interceptors.response.use(

    async (response) => {

        const data = response.data;     //axios returns response obj with data in it

        //if all ok then return data
        if (data.status === 'ok') {

            return data;
        }


        const originalRequest = response.config //to bring url
        const error = data.status
        const statusCode = data.statusCode
        // console.log(originalRequest, error, statusCode);
        // console.log(originalRequest._retry);



        //check if 401 and also check if /auth/refresh is called
        //so if below condn is true we logout the user and redirect to /login
        // if (statusCode === 401 && originalRequest.url === `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`) {
        //     removeItem(KEY_ACCESS_TOKEN)
        //     window.location.replace('/login', '_self')
        //     return Promise.reject(error)
        // }

        //here only access token is expired (refer requireUser.js) 
        //call refresh api silently
        if (statusCode === 401 && !originalRequest._retry) {
            // console.log(originalRequest._retry);

            originalRequest._retry = true
            //here we dont use axiosClient.create because it will call the req interceptor and expired AT will be send to middleware from req interceptor with 
            const response = await axios.create({
                withCredentials: true,
            }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`)

            //console.log('got new AT', response.data);

            // here accestoken is retrieved from '/auth/refresh' if status is 'ok',we get new access token
            if (response.data.status === 'ok') {
                setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken)


                //we put the Authorization and accessToken to the originalRequest
                originalRequest.headers['Authorization'] = `Bearer ${response.data.result.accessToken}`;
                // console.log("og", originalRequest.headers.Authorization);
                // console.log(originalRequest);
                return axios(originalRequest)

            }
            //here refresh token in expired
            else {
                removeItem(KEY_ACCESS_TOKEN)
                window.location.replace('/login', '_self')
                return Promise.reject(error)
            }
        }

        return Promise.reject(error) //returns error in the error block from where original request was was made
    },
    (error) => {

    }
)
