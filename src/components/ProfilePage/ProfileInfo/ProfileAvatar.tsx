import React from "react";
import UserAvatarLoadingBig from "../../UserAvatar/UserAvatarLoadingBig";
import UserAvatarBig from "../../UserAvatar/UserAvatarBig";
import UpdateImgBtn from "../UpdateImgBtn";
import FollowBtn from "../../UsersPage/FollowBtn";

type PropsType = {
    photo:string
    isGettingProfileImg:boolean
    imgAltText:string
    onLoadToggleImg: () => void
    isYourPage:boolean
    isAuthorized:boolean
    isFollowing:boolean
    followed:boolean
    updateProfilePhoto: (photo:Blob) => void
    followUnfollow: () => void
};

const ProfileAvatar: React.FC<PropsType> = (props) => {
    return (
        <div className="Profile__avatar d-flex flex-column">
            {
                (props.photo) ? (
                    <>
                        {props.isGettingProfileImg && (
                            <UserAvatarLoadingBig/>
                        )}
                        <img
                            src={props.photo}
                            alt={props.imgAltText}
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
    )
};

export default ProfileAvatar;