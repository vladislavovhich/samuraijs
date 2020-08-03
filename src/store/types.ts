export type ProfileType = {
    userId:number
    lookingForAJob:boolean
    lookingForAJobDescription:string
    fullName:string
    contacs:ProfileContactsType
    photos:ProfilePhotosType
    aboutMe:null|string
}

export type UserType = {
    name:string
    id:number
    photos: ProfilePhotosType
    status:string|null
    followed:boolean
}

export type ProfileContactsType = {
    github:string
    vk:string
    facebook:string
    instagram:string
    twitter:string
    website:string
    youtube:string
    mainLink:string
}

export type ProfilePhotosType = {
    large:string|null
    small:string|null
}