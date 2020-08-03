import {BaseThunkType, CombineActions} from "../store"
import {UserType} from "../types";
import UsersAPI from "../../api/UsersAPI";

const initState = {
    users:[] as UserType[],
    usersTotalCount:0,
    currentPageNumber:1,
    pageSize: 100,
    portionSize: 3,
    disabledBtns: [] as number[],

    isFollowing:false,
    isGettingUsers:false
}

type InitStateType = typeof initState
export type ActionsTypes = ReturnType<CombineActions<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes>

const usersReducer = (state: InitStateType = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "users/SET_USERS": {
            return {
                ...state,
                users: action.users
            }
        }
        case "users/TOGGLE_GETTING_USERS": {
            return {
                ...state,
                isGettingUsers: action.value
            }
        }
        case "users/SET_CURRENT_PAGE": {
            return {
                ...state,
                currentPageNumber: action.page
            }
        }
        case "users/TOGGLE_FOLLOWING": {
            return {
                ...state,
                isFollowing: action.value
            }
        }
        case "users/ADD_DISABLE_BTN": {
            return {
                ...state,
                disabledBtns: [
                    ...state.disabledBtns,
                    action.id
                ]
            }
        }
        case "users/REMOVE_DISABLE_BTN": {
            return {
                ...state,
                disabledBtns: state.disabledBtns.filter((id) => id !== action.id)
            }
        }
        case "users/FOLLOW": {
            let users:UserType[] = state.users;

            users[action.index] = {
                ...users[action.index],
                followed: true
            }

            return {
                ...state,
                users: users
            }
        }
        case "users/SET_USERS_AMOUNT": {
            return {
                ...state,
                usersTotalCount: action.amount
            }
        }
        case "users/UNFOLLOW": {
            let users:UserType[] = [...state.users];

            users[action.index] = {
                ...users[action.index],
                followed: false
            }

            return {
                ...state,
                users: users
            }
        }
        default: {
            return state
        }
    }
};

export const actions = {
    setUsers: (users:UserType[]) => ({
        type: "users/SET_USERS",
        users: users
    } as const),
    setUsersAmount: (amount:number) => ({
        type: "users/SET_USERS_AMOUNT",
        amount: amount
    } as const),
    toggleGettingUsers: (value:boolean) => ({
        type: "users/TOGGLE_GETTING_USERS",
        value: value
    } as const),
    setCurrentPage: (page:number) => ({
        type: "users/SET_CURRENT_PAGE",
        page: page
    } as const),
    toggleFollowing: (value:boolean) => ({
        type: "users/TOGGLE_FOLLOWING",
        value: value
    } as const),
    addDisableBtn: (id:number) => ({
        type: "users/ADD_DISABLE_BTN",
        id: id
    } as const),
    removeDisableBtn: (id:number) => ({
        type: "users/REMOVE_DISABLE_BTN",
        id: id
    } as const),
    follow: (index:number) => ({
        type: "users/FOLLOW",
        index: index
    } as const),
    unfollow: (index:number) => ({
        type: "users/UNFOLLOW",
        index: index
    } as const)
}

export const thunks = {
    getUsers: (pageSize:number, currentPageNumber:number):ThunkType => async (dispatch) => {
        dispatch(actions.toggleGettingUsers(true));

        try {
            const {items, totalCount, error} = await UsersAPI.getUsers(pageSize, currentPageNumber);

            dispatch(actions.setUsersAmount(totalCount));
            dispatch(actions.setUsers(items));
        } catch (e) {
            alert("Не удалось получить пользователей :(");
            dispatch(actions.toggleGettingUsers(false));
        }

        dispatch(actions.toggleGettingUsers(false));
    },
    follow: (id:number, index:number):ThunkType => async (dispatch) => {
        dispatch(actions.toggleFollowing(true));
        dispatch(actions.addDisableBtn(id));

        try {
            const response = await UsersAPI.follow(id);
            dispatch(actions.follow(index));
        } catch (e) {
            alert("Не удалось добавить пользователя :(");

            dispatch(actions.removeDisableBtn(id));
            dispatch(actions.toggleFollowing(false));
        }

        dispatch(actions.removeDisableBtn(id));
        dispatch(actions.toggleFollowing(false));
    },
    unfollow: (id:number, index:number):ThunkType => async (dispatch) => {
        dispatch(actions.toggleFollowing(true));
        dispatch(actions.addDisableBtn(id));

        try {
            const response = await UsersAPI.unfollow(id);
            dispatch(actions.unfollow(index));
        } catch (e) {
            alert("Не удалось удалить пользователя :(");

            dispatch(actions.removeDisableBtn(id));
            dispatch(actions.toggleFollowing(false));
        }

        dispatch(actions.removeDisableBtn(id));
        dispatch(actions.toggleFollowing(false));
    }
}


export default usersReducer