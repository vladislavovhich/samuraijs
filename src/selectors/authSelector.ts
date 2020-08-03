import {StateType} from "../store/store";

export const authSelector = {
    getLoginErrors: (state: StateType):string => {
        return state.auth.loginErrors;
    },
    getIsAuthorizing: (state: StateType):boolean => {
        return state.auth.isAuthorizing;
    },
    getIsGettingCaptchaUrl: (state: StateType):boolean => {
        return state.auth.isGettingCaptchaUrl;
    },
    getCaptchaUrl: (state: StateType):string | null => {
        return state.auth.captchaUrl;
    },
    getIsGettingCaptchaImg: (state: StateType):boolean => {
        return state.auth.isGettingCaptchaImg;
    }
}