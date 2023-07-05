import axios from "axios";
import { store } from "@/store";


const $api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api',
    timeout: 3000,
})

$api.interceptors.request.use((config): any => {
    config.headers.Authorization = `Bearer ${store.getters['User/access_token']}`
    return config
})

export default $api

// axios.interceptors.response.use(response => response, error => {
//     const status = error.response ? error.response.status : null

//     if (status === 401) {
//         // will loop if refreshToken returns 401
//         return refreshToken(store).then(() => {
//             error.config.headers['Authorization'] = 'Bearer ' + store.state.auth.token;
//             error.config.baseURL = undefined;
//             return axios.request(error.config);
//         })
//         // Would be nice to catch an error here, which would work if the interceptor is omitted
//         .catch(err => err);
//     }

//     return Promise.reject(error);
// });

// function refreshToken(store) {
//     if (store.state.auth.isRefreshing) {
//         return store.state.auth.refreshingCall;
//     }

//     store.commit('auth/setRefreshingState', true);
//     const refreshingCall = axios.get('get token').then(({ data: { token } }) => {
//         store.commit('auth/setToken', token)
//         store.commit('auth/setRefreshingState', false);
//         store.commit('auth/setRefreshingCall', undefined);
//         return Promise.resolve(true);
//     });

//     store.commit('auth/setRefreshingCall', refreshingCall);
//     return refreshingCall;
// }

// export default axios