import instance from "./API"
import {ProfileContactsType, ProfilePhotosType, ProfileType} from "../store/types";

type UpdatePhotoType = {
    data: {
        photos: ProfilePhotosType
    }
    resultCode:number
    messages:string[]
}
export type UpdateProfileType = {
    userId:number
    lookingForAJob:boolean
    lookingForAJobDescription:string
    fullName:string
    contacts:ProfileContactsType
    aboutMe:string
}

const ProfileAPI = {
    getProfile: (id:number) => {
        return instance.get<ProfileType>(`/profile/${id}`).then(response => response.data);
    },
    getStatus: (id:number) => {
        return instance.get<string>(`/profile/status/${id}`).then(response => response.data);
    },
    isFollowed: (id:number) => {
        return instance.get<boolean>(`/follow/${id}`).then(response => response.data);
    },
    setProfileStatus: (status: string) => {
        return instance.put(`profile/status`, {
            status: status
        }).then(response => response.data)
    },
    updatePhoto: (photo:Blob) => {
        const formData = new FormData();

        formData.append("image", photo);

        return instance.put<UpdatePhotoType>(`/profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => response.data);
    },
    updateProfile: (newProfile:UpdateProfileType) => {
        return instance.put(`/profile`, newProfile).then(response => response.data);
    }
}

export default ProfileAPI