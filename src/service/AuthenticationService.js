import axios from 'axios';
import { API_BASE_URL, APP_TOKEN } from '../common/constants/Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const API_ADMIN = '/admin'
export const API_ORGANIZATION_ALL = API_ADMIN + '/organization/all'

export const instance = axios.create({ baseURL: API_BASE_URL })
instance.defaults.headers.Authorization = localStorage.getItem(APP_TOKEN)
instance.interceptors.response.use((response) => {
    return response.data;
  }, (error) => {
    return Promise.reject(error);
  });

class AuthenticationService {

    executeJwtAuthenticationService(usernameOrEmail, password) {
        console.log(usernameOrEmail);
        return instance.post(`/auth/signin`, {
            usernameOrEmail,
            password
        })
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        instance.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    console.log("Hii");
                    localStorage.setItem(APP_TOKEN, token)
                    config.headers.Authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()