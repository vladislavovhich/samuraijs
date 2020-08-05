import React, {useState} from "react";
import {ProfileType} from "../../../store/types";
import "../../../styles/profilePage/ProfileInfo.scss";
import HorizontalSmallPreloader from "../../Common/HorizontalSmallPreloader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UpdateProfileType} from "../../../api/ProfileAPI";
import UpdatingProfileForm from "../UpdatingProfileForm/UpdatingProfileForm";
import ProfileAvatar from "./ProfileAvatar";
import ProfileTextInfo from "./ProfileTextInfo";
import ProfileAdditionInfo from "./ProfileAdditionInfo/ProfileAdditionInfo";

type PropsType = {
    profile:ProfileType|null
    isGettingProfileImg:boolean
    onLoadToggleImg: () => void
    isYourPage:boolean
    isAuthorized:boolean
    isFollowing:boolean
    followed:boolean
    followUnfollow: () => void
    isGettingProfileStatus:boolean
    profileStatus:string|null
    setProfileStatus: (status:string) => void
    updateProfilePhoto: (photo:Blob) => void
    updateProfile:(newProfile:UpdateProfileType) => void
    isUpdatingProfile:boolean
};

const ProfileInfo: React.FC<PropsType> = (props) => {
    const [editingProfile, toggleEditingProfile] = useState<boolean>(false);

    const onClickToggleEditProfile = () => {
        toggleEditingProfile(true);
    }

    const onClickUpdateProfile = (newProfile:UpdateProfileType) => {
        toggleEditingProfile(false);
        props.updateProfile(newProfile);
    }

    return (
        (props.profile) ? (
            <div className="Profile__info d-flex flex-column">
                <div className="d-flex flex-row">
                    <ProfileAvatar
                        photo={props.profile.photos.large || ""}
                        isGettingProfileImg={props.isGettingProfileImg}
                        imgAltText={props.profile.fullName}
                        onLoadToggleImg={props.onLoadToggleImg}
                        isYourPage={props.isYourPage}
                        isAuthorized={props.isAuthorized}
                        isFollowing={props.isFollowing}
                        followed={props.followed}
                        updateProfilePhoto={props.updateProfilePhoto}
                        followUnfollow={props.followUnfollow}
                    />
                    <div className="ml-3">
                        <ProfileTextInfo
                            isUpdatingProfile={props.isUpdatingProfile}
                            fullName={props.profile.fullName}
                            isGettingProfileStatus={props.isGettingProfileStatus}
                            profileStatus={props.profileStatus || "Нет статуса"}
                            setProfileStatus={props.setProfileStatus}
                            isYourPage={props.isYourPage}
                        />
                    </div>
                </div>

                <div className="d-flex flex-column">
                    <div className="hr mt-3"/>

                    {editingProfile ? (
                        <UpdatingProfileForm
                            fullName={props.profile.fullName || ""}
                            lookingForAJob={props.profile.lookingForAJob}
                            lookingForAJobDescription={props.profile.lookingForAJobDescription || ""}
                            aboutMe={props.profile.aboutMe || ""}
                            contacts={props.profile.contacs}
                            userId={props.profile.userId}

                            isUpdatingProfile={props.isUpdatingProfile}
                            onClickUpdateProfile={onClickUpdateProfile}
                        />
                    ) : (
                        <div className="mt-3">
                            <ProfileAdditionInfo
                                isUpdatingProfile={props.isUpdatingProfile}
                                lookingForAJob={props.profile.lookingForAJob}
                                lookingForAJobDescription={props.profile.lookingForAJobDescription}
                                aboutMe={props.profile.aboutMe}
                            />
                        </div>
                    )}

                    {(!editingProfile && props.isYourPage) && (
                        <button
                            className="UpdateImgBtn mt-2 d-flex align-items-center justify-content-center"
                            disabled={props.isUpdatingProfile}
                            onClick={onClickToggleEditProfile}
                        >
                            {props.isUpdatingProfile ? (
                                <HorizontalSmallPreloader/>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon="cog"/>
                                    <div className="ml-1">Изменить</div>
                                </>
                            )}
                        </button>
                    )}

                    <div className="hr mt-3"/>
                </div>
            </div>
        ) : null
    )
};

export default ProfileInfo;