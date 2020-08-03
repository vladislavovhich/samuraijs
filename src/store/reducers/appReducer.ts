import {BaseThunkType, CombineActions} from "../store"

const initState = {
    userId:0,
    isAuthorized:false
}

type InitStateType = typeof initState
export type ActionsTypes = ReturnType<CombineActions<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes>

const appReducer = (state: InitStateType = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "app/SET_USER_ID": {
            return {
                ...state,
                userId: action.userId
            }
        }
        case "app/TOGGLE_AUTHORIZED": {
            return {
                ...state,
                isAuthorized: action.value
            }
        }
        default: {
            return state
        }
    }
};

export const actions = {
    setUserId: (userId:number) => ({
        type: "app/SET_USER_ID",
        userId: userId
    } as const),
    toggleAuthorized: (value:boolean) => ({
        type: "app/TOGGLE_AUTHORIZED",
        value: value
    } as const)
}

export default appReducer