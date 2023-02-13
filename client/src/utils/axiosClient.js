import axios from 'axios'
import { KEY_ACCESS_TOKEN, removeItem, setItem } from './localStorage'

export const axiosClient = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,

})

//sending Authorization in Header with Bearer space accessToken (Authorization Token) for accessing any data (more detail in requireUser.js)
axiosClient.interceptors.request.use(
    (request) => {
        const accessToken = get(KEY_ACCESS_TOKEN);
        request.headers['Authorization'] = `Bearer ${accessToken}`;

        return request;

    }
    //we will only get 200 OK because we are using responseWrapper.js(instead we will check the statusCode)
)




axiosClient.interceptors.response.use(

    async (response) => {

        const data = response.data;     //axios returns response obj with data in it
        const originalRequest = response.config //to bring url
        const error = data.error

        //if all ok then return data
        if (data.status === 'ok') {
            return data;
        }

        //check if 401 and also check if /auth/refresh is called
        //so if above condn is true we logout the user and redirect to /login
        if (data.statusCode == 401 && originalRequest.url === 'http://localhost:3000/auth/refresh') {
            removeItem(KEY_ACCESS_TOKEN)
            window.location.replace('/login', '_self')
            return Promise.reject(error)
        }

        //here only access token is expired (refer requireUser.js) 
        //call refresh api silently
        if (data.statusCode == 401) {
            const response = await axiosClient.get('/auth/refresh')

            if (response.status == 'ok') {
                setItem(KEY_ACCESS_TOKEN, response.result)
            }
        }

    }
)