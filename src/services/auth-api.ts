import Axios, { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import  Login  from '../security/login';
import Register from '../security/register';

Axios.defaults.baseURL = 'http://localhost:5138'; 

Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); 

//Axios.interceptors.request.use((config) => {
//  const token = localStorage.getItem('token');
//    if (token) {
//        config.headers.Authorization = `Bearer ${token}`;
//    }
//    return config;
//}); 


const http = Axios.create(
    {
    baseURL: "https://localhost:7209"
    }
)
export async function RegisterApi(data: Register) {
    return await http.post<Register>('/Token/Register', data);
}

export async function LoginApi(data: Login) {
    return await http.post<Login, AxiosResponse<any>>('/Token/Login', data);
}
export function AuthProcess(token: string) {

    

}





//export function AuthHeader() {
//    return {
//        Authorization: 'Bearer ' + localStorage.getItem('token')
//    }

//}

//export const Header: any = {

//    headers: {
//        'Content-Type': 'application/json',
//        Authorization: 'Bearer ' + localStorage.getItem('token')
//    }
//}




export const axios_config: AxiosRequestConfig<AxiosHeaders> = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};