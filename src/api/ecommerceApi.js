import axios from "axios";
import { getEnvVariables } from "../helpers";

export const { VITE_API_URL } = getEnvVariables()


const ecommerceApi = axios.create({
    baseURL: VITE_API_URL
})


// TODO: configurar interceptores
ecommerceApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config
})


export default ecommerceApi;