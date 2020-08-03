import instance from "./API"

export type AuthDataType = {
    email:string
    password:string
    captcha?:string
}
type logoutResponseType = {
    resultCode:number
    messages:string[]
    data: object
}
type LoginResponseType = {
    resultCode:number
    messages:string[]
    data: {
        userId:number
    }
}
type AuthMeResponseType = {
    resultCode:number
    messages:string[],
    data: {
        id:number
        email:string
        password:string
    }
}
type GetCaptchaUrl = {
    url:string
}

const AuthAPI = {
    getCaptchaUrl:() => {
        return instance.get<GetCaptchaUrl>(`/security/get-captcha-url`).then(response => response.data.url);
    },
    auth: (authData:AuthDataType) => {
        return instance.post<LoginResponseType>(`/auth/login`, authData).then(response => response.data);
    },
    authMe: () => {
        return instance.get<AuthMeResponseType>(`/auth/me`).then(response => response.data);
    },
    logout: () => {
        return instance.delete<logoutResponseType>(`/auth/login`).then(response => response.data);
    }
}

export default AuthAPI