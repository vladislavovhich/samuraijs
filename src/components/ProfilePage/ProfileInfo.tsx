import React, {useState} from "react";
import UserAvatarLoadingBig from "../UserAvatar/UserAvatarLoadingBig";
import UserAvatarBig from "../UserAvatar/UserAvatarBig";
import FollowBtn from "../UsersPage/FollowBtn";
import {ProfileType} from "../../store/types";
import "../../styles/profilePage/ProfileInfo.scss";
import ProfileStatus from "./ProfileStatus";
import UpdateImgBtn from "./UpdateImgBtn";
import HorizontalSmallPreloader from "../Common/HorizontalSmallPreloader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UpdateProfileType} from "../../api/ProfileAPI";
import UpdatingProfileForm from "./UpdatingProfileForm";
import HorizontalGraySmallPreloader from "../Common/HorizontalGraySmallPreloader";

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
                    <div className="Profile__avatar d-flex flex-column">
                        {
                            (props.profile.photos.large) ? (
                                <>
                                    {props.isGettingProfileImg && (
                                        <UserAvatarLoadingBig/>
                                    )}
                                    <img
                                        src={props.profile.photos.large}
                                        alt={props.profile.fullName}
                                        hidden={props.isGettingProfileImg}
                                        onLoad={props.onLoadToggleImg}
                                        className="Profile__img"
                                    />
                                </>
                            ) : (
                                <UserAvatarBig/>
                            )
                        }
                        {(props.isYourPage && props.isAuthorized) && (
                            <UpdateImgBtn
                                isDisabled={props.isGettingProfileImg}
                                updatePhoto={props.updateProfilePhoto}
                            />
                        )}
                        {(!props.isYourPage && props.isAuthorized) && (
                            <FollowBtn
                                isDisabled={props.isFollowing}
                                isFollowing={props.isFollowing}
                                isFollowed={props.followed}
                                extraCondition={true}
                                followUnfollow={props.followUnfollow}
                            />
                        )}
                    </div>
                    <div className="Profile__textInfo d-flex flex-column ml-3">
                        <div className="Profile__name flex-grow-0">
                            {
                                (props.isUpdatingProfile) ? (
                                    <div className="PrealoderName mb-1 d-flex justify-content-center flex-grow-0">
                                        <HorizontalGraySmallPreloader/>
                                    </div>
                                ) : (
                                    props.profile.fullName
                                )
                            }
                        </div>
                        <ProfileStatus
                            isGettingProfileStatus={props.isGettingProfileStatus}
                            profileStatus={props.profileStatus}
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
                        <div className="Profile__additionInfo d-flex mt-3 flex-column">
                            <div className="Profile__lookingAjob d-flex flex-row">
                                <div className="PropName">
                                    Ищет работу:
                                </div>
                                <div className="PropVal d-flex align-items-center justify-content-center">
                                    {props.isUpdatingProfile ? (
                                        <HorizontalSmallPreloader />
                                    ) : (
                                        props.profile.lookingForAJob ? "Да" : "Нет"
                                    )}
                                </div>
                            </div>
                            <div className="Profile__lookingJobDescription d-flex flex-row mt-2">
                                <div className="PropName">
                                    Описание:
                                </div>
                                <div className="PropVal d-flex align-items-center justify-content-center">
                                    {props.isUpdatingProfile ? (
                                        <HorizontalSmallPreloader />
                                    ) : (
                                        props.profile.lookingForAJobDescription || "Отсутствует"
                                    )}
                                </div>
                            </div>
                            <div className="Profile__aboutUser d-flex flex-row mt-2">
                                <div className="PropName">
                                    О пользователе:
                                </div>
                                <div className="PropVal d-flex align-items-center justify-content-center">
                                    {props.isUpdatingProfile ? (
                                        <HorizontalSmallPreloader />
                                    ) : (
                                        props.profile.aboutMe || "Пусто"
                                    )}
                                </div>
                            </div>
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