import axios from 'axios'
import Cookies from "js-cookie";





const getConfig = {
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'get',
    withCredentials: true

}


const postConfig = {
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'post',
    withCredentials: true
}


const patchConfig = {
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'patch',
    withCredentials: true
}

// const deleteConfig: Params = {
//     baseUrl: "https://www.neurex-api.thoughti.com",
//     headers: {
//         "Authorization": "Basic dGhvdWdodGk6VGhvdWdodGlAIzMyMQ==",
//         "Content-Type": "text/plain"
//     },
//     method: 'delete'
// }


export const getAPI = async (url: string, data: any) => {


    return await axios({
        ...getConfig,
        url: `${getConfig.baseUrl}/${url}?${data}`,
    }).then((response) => {
        console.log(response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) => {
        console.log(error);
        if (error.response.status == 403) {
            Cookies.remove('enrgyUser');
            window.location.replace('/login');
        }
        return {
            status: error.status,
            data: error.response
        }
    })
}


export const postAPI = async (url: string, data: any, params: string) => {

    return await axios({
        ...postConfig,
        url: `${postConfig.baseUrl}/${url}?${params}`,
        data
    }).then((response) => {
        console.log(response);
        if (response.status == 403) {
            Cookies.remove('enrgyUser');
            window.location.replace('/login');
        }
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) => {
        console.log(error)
        if (error.response.status == 403) {
            Cookies.remove('enrgyUser');
            window.location.replace('/login');
        }
        return {
            status: error.response.status,
            data: error.response.data
        }
    })
}


export const patchAPI = async (url: string, data: any, params: string) => {

    return await axios({
        ...patchConfig,
        url: `${patchConfig.baseUrl}/${url}?${params}`,
        data
    }).then((response) => {
        console.log(response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) => {
        console.log(error)
        if (error.response.status == 403) {
            Cookies.remove('enrgyUser');
            window.location.replace('/login');
        }

        return {
            status: error.response.status,
            data: error.response.data
        }
    })
}

// export const deleteAPI = async (url: string, data: any): Promise<any> => {
//     return await axios({
//         ...deleteConfig,
//         url: `${deleteConfig.baseUrl}/${url}?${data}`,
//     }).then((response) => {
//         console.log(response)
//         return {
//             status: response.status,
//             data: response.data
//         }
//     }).catch((error) => {
//         console.log(error)
//         return {
//             status: error.status,
//             data: error.response
//         }
//     })
// }