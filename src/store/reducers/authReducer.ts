import {BaseThunkType, CombineActions} from "../store"
import AuthAPI, {AuthDataType} from "../../api/AuthAPI";
import {ActionsTypes as AppActionsTypes, actions as appActions} from "./appReducer";


const initState = {
    isAuthorizing:false,
    isGettingCaptchaUrl:false,
    isGettingCaptchaImg:false,
    isLogouting:false,
    isAuthorizingMe:false,
    loginErrors:"",
    captchaUrl:null as string|null,
}

type InitStateType = typeof initState
export type ActionsTypes = ReturnType<CombineActions<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes | AppActionsTypes>

const {setUserId, toggleAuthorized} = appActions;

const authReducer = (state: InitStateType = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "auth/TOGGLE_IS_AUTHORIZING": {
            return {
                ...state,
                isAuthorizing: action.value
            }
        }
        case "auth/TOGGLE_LOGOUTING": {
            return {
                ...state,
                isLogouting: action.value
            }
        }
        case "auth/SET_LOGIN_ERRORS": {
            return {
                ...state,
                loginErrors: action.errors
            }
        }
        case "auth/TOGGLE_GETTING_CAPTCHA_URL": {
            return {
                ...state,
                isGettingCaptchaUrl: action.value
            }
        }
        case "auth/TOGGLE_AUTHORIZING_ME": {
            return {
                ...state,
                isAuthorizingMe: action.value
            }
        }
        case "auth/TOGGLE_GETTING_CAPTCHA_IMG": {
            return {
                ...state,
                isGettingCaptchaImg: action.value
            }
        }
        case "auth/SET_CAPTCHA_URL": {
            return {
                ...state,
                captchaUrl: action.url
            }
        }
        default: {
            return state
        }
    }
};

export const actions = {
    toggleAuthorizing: (value:boolean) => ({
        type: "auth/TOGGLE_IS_AUTHORIZING",
        value: value
    } as const),
    toggleGettingCaptchaUrl: (value:boolean) => ({
        type: "auth/TOGGLE_GETTING_CAPTCHA_URL",
        value: value
    } as const),
    setLoginErrors: (errors:string) => ({
        type: "auth/SET_LOGIN_ERRORS",
        errors: errors
    } as const),
    setCaptchaUrl: (url:string) => ({
        type: "auth/SET_CAPTCHA_URL",
        url: url
    } as const),
    toggleLogouting: (value:boolean) => ({
        type: "auth/TOGGLE_LOGOUTING",
        value: value
    } as const),
    toggleAuthorizingMe: (value:boolean) => ({
        type: "auth/TOGGLE_AUTHORIZING_ME",
        value: value
    } as const),
    toggleGettingCaptchaImg: (value:boolean) => ({
        type: "auth/TOGGLE_GETTING_CAPTCHA_IMG",
        value: value
    } as const)
}

export const thunks = {
    login: (loginData:AuthDataType):ThunkType => async (dispatch) => {
        dispatch(actions.toggleAuthorizing(true));

        try {
            const response = await AuthAPI.auth(loginData);

            if (response.resultCode === 0) {
                const userId = response.data.userId;

                dispatch(setUserId(userId));
                dispatch(toggleAuthorized(true));
            } else if (response.resultCode === 10) {
                dispatch(actions.setLoginErrors("Введите каптчу!"));
                dispatch(thunks.getCaptchaUrl());
            } else if (response.resultCode === 1) {
                dispatch(actions.setLoginErrors("Неверный логин или пароль!"));
            } else {
                dispatch(actions.setLoginErrors(response.messages[0]));
            }
        } catch (e) {
            alert("Не удалось авторизоваться...");
            dispatch(actions.toggleAuthorizing(false));
        }

        dispatch(actions.toggleAuthorizing(false));
    },
    getCaptchaUrl: ():ThunkType => async (dispatch) => {
        dispatch(actions.toggleGettingCaptchaUrl(true));
        dispatch(actions.toggleGettingCaptchaImg(true));

        try {
            const captcha = await AuthAPI.getCaptchaUrl();

            dispatch(actions.setCaptchaUrl(captcha));
        } catch (e) {
            actions.toggleGettingCaptchaUrl(false);
        }

        dispatch(actions.toggleGettingCaptchaUrl(false));
    },
    logout: ():ThunkType => async (dispatch) => {
        dispatch(actions.toggleLogouting(true));

        try {
            const response = await AuthAPI.logout();

            if (response.resultCode === 0) {
                dispatch(setUserId(0));
                dispatch(toggleAuthorized(false));
            }
        } catch (e) {
            alert("Не удалось выйти :(");
            dispatch(actions.toggleLogouting(false));
        }

        dispatch(actions.toggleLogouting(false));
    },
    loginMe: ():ThunkType => async (dispatch) => {
        dispatch(actions.toggleAuthorizingMe(true));

        try {
            const response = await AuthAPI.authMe();
            const userId = response.data.id;

            if (response.resultCode === 0) {
                dispatch(setUserId(userId));
                dispatch(toggleAuthorized(true));
            }
        } catch (e) {
            alert("Не удалось авторизоваться...");
            dispatch(actions.toggleAuthorizingMe(false));
        }

        dispatch(actions.toggleAuthorizingMe(false));
    }
}

export default authReducer