import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {UserType} from "../../store/types";
import "../../styles/UsersPage/User.scss";
import UserAvatarSmall from "../UserAvatar/UserAvatarSmall";
import UserAvatarLoadingSmall from "../UserAvatar/UserAvatarLoadingSmall";
import FollowBtn from "./FollowBtn";

type PropsType = {
    user:UserType
    isFollowing:boolean
    isDisabled:boolean
    index:number
    isAuthorized:boolean

    follow: (id:number, index:number) => void
    unfollow: (id:number, index:number) => void
};

const User: React.FC<PropsType> = (props) => {
    const onClickFollowOrUnfollow = () => {
        if (props.user.followed) {
            props.unfollow(props.user.id, props.index);
        } else {
            props.follow(props.user.id, props.index);
        }
    }
    const [fetchingImage, toggleFetchingImage] = useState<boolean>(!!props.user.photos.small);
    const onLoadTogglFetchingImage = () => {
        toggleFetchingImage(false);
    }

    return (
        <div className="User d-flex flex-row">
            <div className="d-flex flex-column">
                {
                    (!!props.user.photos.small) ? (
                        <>
                            {fetchingImage && <UserAvatarLoadingSmall/>}
                            <img
                                src={props.user.photos.small}
                                alt={props.user.name}
                                className="User__imgAvatar"
                                onLoad={onLoadTogglFetchingImage}
                                hidden={fetchingImage}
                            />
                        </>
                    ) : (
                        <UserAvatarSmall/>
                    )
                }
                <FollowBtn
                    isDisabled={props.isDisabled}
                    isFollowing={props.isFollowing}
                    isFollowed={props.user.followed}
                    extraCondition={props.isAuthorized}
                    followUnfollow={onClickFollowOrUnfollow}
                />
            </div>

            <div className="User__info ml-2 d-flex flex-column">
                <div className="User__name">
                    <NavLink to={`/profile/${props.user.id}`}>
                        {props.user.name}
                    </NavLink>
                </div>
                <div className="User__status">
                    {props.user.status || "Нет статуса"}
                </div>
            </div>
        </div>
    )
};

export default User;