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
        console.log('interceptor', request.headers.Authorization);
        return request;

    }
    //we will only get 200 OK because we are using responseWrapper.js(instead we will check the statusCode)
)


axiosClient.interceptors.response.use(

    async (response) => {

        const data = response.data;     //axios returns response obj with data in it
        console.log(data);
        //if all ok then return data
        if (data.status === 'ok') {
            return data;
        }


        const originalRequest = response.config //to bring url
        const error = data.error
        const statusCode = data.statusCode





        //check if 401 and also check if /auth/refresh is called
        //so if above condn is true we logout the user and redirect to /login
        if (statusCode === 401 && originalRequest.url === `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`) {
            removeItem(KEY_ACCESS_TOKEN)
            window.location.replace('/login', '_self')
            return Promise.reject(error)
        }

        //here only access token is expired (refer requireUser.js) 
        //call refresh api silently
        if (statusCode === 401) {
            const response = await axios.create({
                withCredentials: true,
            }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`)

            console.log('got new AT', response.data);

            // here accestoken is retrieved from '/auth/refresh' if status is 'ok',we get new access token
            if (response.data.status === 'ok') {
                setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken)

                //here originalRequest is '/posts/all'
                //we put the Authorization and accessToken to the originalRequest
                originalRequest.headers['Authorization'] = `Bearer ${response.data.result.accessToken}`;
                // console.log("og", originalRequest.headers.Authorization);
                return axios(originalRequest)

            }
        }
        return Promise.reject(error)
    },
    (error) => {

    }
)
