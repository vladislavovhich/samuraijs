import {StateType} from "../store/store";
import {UserType} from "../store/types";

export const usersSelector = {
    getUsers: (state:StateType):UserType[] => {
        return state.usersPage.users;
    },
    getUsersTotalCount: (state:StateType):number => {
        return state.usersPage.usersTotalCount;
    },
    getCurrentPageNumber: (state:StateType):number => {
        return state.usersPage.currentPageNumber;
    },
    getPageSize: (state:StateType):number => {
        return state.usersPage.pageSize;
    },
    getPortionSize: (state:StateType):number => {
        return state.usersPage.portionSize;
    },
    getDisabledBtns: (state:StateType):number[] => {
        return state.usersPage.disabledBtns;
    },

    getIsFollowing: (state:StateType):boolean => {
        return state.usersPage.isFollowing;
    },
    getIsGettingUsers: (state:StateType):boolean => {
        return state.usersPage.isGettingUsers;
    }
}