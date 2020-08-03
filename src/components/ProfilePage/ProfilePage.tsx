import React, {useEffect} from "react";
import {ProfileType} from "../../store/types";
import {actions} from "../../store/reducers/profileReducer";
import "../../styles/profilePage/ProfilePage.scss";
import UserAvatarLoadingBig from "../UserAvatar/UserAvatarLoadingBig";
import UserAvatarBig from "../UserAvatar/UserAvatarBig";
import HorizontalGraySmallPreloader from "../Common/HorizontalGraySmallPreloader";
import FollowedLoading from "./FollowedLoading";
import FollowBtn from "../UsersPage/FollowBtn";
import {Props} from "./ProfileContainer";
import LoadingProfile from "./LoadingProfile";
import ProfileInfo from "./ProfileInfo";

type PropsType = Props & {
    isYourPage:boolean
};

const ProfilePage: React.FC<PropsType> = (props) => {
    const profile = props.profile;

    let followUnfollow = () => {};

    if (profile) {
        followUnfollow = () => {
            if (props.followed) {
                props.unfollow(profile.userId);
            } else {
                props.follow(profile.userId);
            }
        }
    }

    const onLoadToggleImg = () => {
        props.toggleGettingProfileImg(false);
    }

    useEffect(() => {
        props.toggleGettingProfileImg(true);
    }, []);

    return (

        <div className="ProfilePage w-100 h-100 py-3">
            {
                (props.isGettingProfile || !profile) ? (
                    <LoadingProfile
                        isYourPage={props.isYourPage}
                        isAuthorized={props.isAuthorized}
                    />
                ) : (
                    <ProfileInfo
                        profile={props.profile}
                        isGettingProfileImg={props.isGettingProfileImg}
                        onLoadToggleImg={onLoadToggleImg}
                        isYourPage={props.isYourPage}
                        isAuthorized={props.isAuthorized}
                        isFollowing={props.isFollowing}
                        followed={props.followed}
                        followUnfollow={followUnfollow}
                        isGettingProfileStatus={props.isGettingProfileStatus}
                        profileStatus={props.profileStatus}
                        setProfileStatus={props.setProfileStatus}
                        updateProfilePhoto={props.updateProfilePhoto}
                        updateProfile={props.updateProfile}
                        isUpdatingProfile={props.isUpdatingProfile}
                    />
                )
            }
        </div>
    )
};

export default ProfilePage;