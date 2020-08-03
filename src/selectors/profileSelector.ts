import {StateType} from "../store/store";
import {ProfileType} from "../store/types";

export const profileSelector = {
    getProfile: (state:StateType):ProfileType|null => {
        return state.profilePage.profile
    },
    getProfileStatus: (state:StateType):string|null => {
        return state.profilePage.profileStatus
    },
    getGettingProfile: (state:StateType):boolean => {
        return state.profilePage.isGettingProfile
    },
    getGettingProfileImg: (state:StateType):boolean => {
        return state.profilePage.isGettingProfileImg
    },
    getGettingProfileStatus: (state:StateType):boolean => {
        return state.profilePage.isGettingProfileStatus;
    },
    getFollowed: (state:StateType):boolean => {
        return state.profilePage.followed;
    },
    getFollowing: (state:StateType):boolean => {
        return state.profilePage.isFollowing;
    },
    getUpdatingProfile: (state:StateType):boolean => {
        return state.profilePage.isUpdatingProfile;
    }
}