import {BaseThunkType, CombineActions} from "../store"
import {ProfilePhotosType, ProfileType} from "../types";
import ProfileAPI, {UpdateProfileType} from "../../api/ProfileAPI";
import UsersAPI from "../../api/UsersAPI";

const initState = {
    profile:null as ProfileType|null,
    profileStatus:null as string|null,
    followed:false,

    isGettingProfile:false,
    isGettingProfileStatus:false,
    isGettingProfileImg:false,
    isFollowing:false,
    isUpdatingProfile:false
}

type InitStateType = typeof initState
export type ActionsTypes = ReturnType<CombineActions<typeof actions>>
type ThunkType = BaseThunkType<ActionsTypes>

const profileReducer = (state: InitStateType = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "profile/SET_PROFILE": {
            return {
                ...state,
                profile:action.profile
            }
        }
        case "profile/TOGGLE_DOWNLOADING_PROFILE": {
            return {
                ...state,
                isGettingProfile: action.value
            }
        }
        case "profile/SET_PROFILE_STATUS": {
            return {
                ...state,
                profileStatus: action.profileStatus
            }
        }
        case "profile/TOGGLE_GETTING_PROFILE_STATUS": {
            return {
                ...state,
                isGettingProfileStatus: action.value
            }
        }
        case "profile/TOGGLE_FOLLOW_PROP": {
            return {
                ...state,
                followed: action.value
            }
        }
        case "profile/TOGGLE_FOLLOWING": {
            return {
                ...state,
                isFollowing: action.value
            }
        }
        case "profile/SET_PROFILE_PHOTOS": {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType | null
            }
        }
        case "profile/TOGGLE_GETTING_PROFILE_IMG": {
            return {
                ...state,
                isGettingProfileImg: action.value
            }
        }
        case "profile/TOGGLE_UPDATING_PROFILE": {
            return {
                ...state,
                isUpdatingProfile: action.value
            }
        }
        case "profile/UPDATE_PROFILE": {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    aboutMe: action.newProfile.aboutMe,
                    fullName: action.newProfile.fullName,
                    lookingForAJob: action.newProfile.lookingForAJob,
                    lookingForAJobDescription: action.newProfile.lookingForAJobDescription,
                } as ProfileType
            }
        }
        default: {
            return state
        }
    }
};

export const actions = {
    setProfile: (profile:ProfileType) => ({
        type: "profile/SET_PROFILE",
        profile:profile
    } as const),
    setProfileStatus: (profileStatus:string|null) => ({
        type: "profile/SET_PROFILE_STATUS",
        profileStatus: profileStatus
    } as const),
    toggleGettingProfile: (value:boolean) => ({
        type: "profile/TOGGLE_DOWNLOADING_PROFILE",
        value: value
    } as const),
    toggleFollowProp: (value:boolean) => ({
        type: "profile/TOGGLE_FOLLOW_PROP",
        value: value
    } as const),
    toggleGettingProfileStatus: (value:boolean) => ({
        type: "profile/TOGGLE_GETTING_PROFILE_STATUS",
        value: value
    } as const),
    toggleUpdatingProfile: (value:boolean) => ({
        type: "profile/TOGGLE_UPDATING_PROFILE",
        value: value
    } as const),
    toggleGettingProfileImg: (value:boolean) => ({
        type: "profile/TOGGLE_GETTING_PROFILE_IMG",
        value: value
    } as const),
    toggleFollowing: (value:boolean) => ({
        type: "profile/TOGGLE_FOLLOWING",
        value: value
    } as const),
    setProfilePhotos: (photos: ProfilePhotosType) => ({
        type: "profile/SET_PROFILE_PHOTOS",
        photos: photos
    } as const),
    updateProfile: (newProfile: UpdateProfileType) => ({
        type: "profile/UPDATE_PROFILE",
        newProfile: newProfile
    } as const)

}

export const thunks = {
    getProfile: (userId:number): ThunkType => async (dispatch) => {
        dispatch(actions.toggleGettingProfile(true));

        try {
            const profile = await ProfileAPI.getProfile(userId);

            dispatch(actions.setProfile(profile));
        } catch (e) {
            alert("Не удалось получить профиль!");
        }

        dispatch(actions.toggleGettingProfile(false));
    },
    getProfileStatus: (userId:number):ThunkType => async (dispatch) => {
        dispatch(actions.toggleGettingProfileStatus(true));

        try {
            const profileStatus = await ProfileAPI.getStatus(userId);

            dispatch(actions.setProfileStatus(profileStatus));
        } catch (e) {
            alert("Не удалось получить стасус!");
            dispatch(actions.toggleGettingProfileStatus(true));
        }

        dispatch(actions.toggleGettingProfileStatus(false));
    },
    setProfileStatus: (status:string):ThunkType => async (dispatch) => {
        dispatch(actions.toggleGettingProfileStatus(true));

        try {
            const response = await ProfileAPI.setProfileStatus(status);

            dispatch(actions.setProfileStatus(status));
        } catch (e) {
            alert("Не удалось обновить статус!");
            dispatch(actions.toggleGettingProfileStatus(false));
        }

        dispatch(actions.toggleGettingProfileStatus(false));
    },
    checkIsFollowed: (id:number):ThunkType => async (dispatch) => {
        dispatch(actions.toggleFollowing(true));

        try {
            const isFollowed = await ProfileAPI.isFollowed(id);

            dispatch(actions.toggleFollowProp(isFollowed));
        } catch (e) {
            alert("Не удалось добавить пользователя :(");

            dispatch(actions.toggleFollowing(false));
        }

        dispatch(actions.toggleFollowing(false));
    },
    follow: (id:number):ThunkType => async (dispatch) => {
        dispatch(actions.toggleFollowing(true));

        try {
            const response = await UsersAPI.follow(id);
            dispatch(actions.toggleFollowProp(true));
        } catch (e) {
            alert("Не удалось добавить пользователя :(");

            dispatch(actions.toggleFollowing(false));
        }

        dispatch(actions.toggleFollowing(false));
    },
    unfollow: (id:number):ThunkType => async (dispatch) => {
        dispatch(actions.toggleFollowing(true));

        try {
            const response = await UsersAPI.unfollow(id);
            dispatch(actions.toggleFollowProp(false));
        } catch (e) {
            alert("Не удалось удалить пользователя :(");;
            dispatch(actions.toggleFollowing(false));
        }

        dispatch(actions.toggleFollowing(false));
    },
    updateProfilePhoto: (photo:Blob):ThunkType => async (dispatch) => {
        dispatch(actions.toggleGettingProfileImg(true));

        try {
            const response = await ProfileAPI.updatePhoto(photo);

            dispatch(actions.setProfilePhotos(response.data.photos));
        } catch (e) {
            alert("Не удалось обновить фото :(");
        }
    },
    updateProfile: (newProfile:UpdateProfileType):ThunkType => async (dispatch) => {
        dispatch(actions.toggleUpdatingProfile(true));

        try {
            await ProfileAPI.updateProfile(newProfile);

            dispatch(actions.updateProfile(newProfile));
        } catch (e) {
            alert("Не удалось обновить информацию о профиле :(");
            dispatch(actions.toggleUpdatingProfile(false));
        }

        dispatch(actions.toggleUpdatingProfile(false));
    }
}

export default profileReducer