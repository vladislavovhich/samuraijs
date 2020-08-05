import React from "react";
import {NavLink} from "react-router-dom";
import {UserType} from "../../../store/types";
import "../../../styles/UsersPage/User.scss";
import FollowBtn from "../FollowBtn";
import UserAvatar from "./UserAvatar";
import UserInfo from "./UserInfo";

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

    return (
        <div className="User d-flex flex-row">
            <div className="d-flex flex-column">
                <UserAvatar
                    photo={props.user.photos.small || ""}
                />
                <FollowBtn
                    isDisabled={props.isDisabled}
                    isFollowing={props.isFollowing}
                    isFollowed={props.user.followed}
                    extraCondition={props.isAuthorized}
                    followUnfollow={onClickFollowOrUnfollow}
                />
            </div>

            <div className="ml-2">
                <UserInfo
                    id={props.user.id}
                    name={props.user.name}
                    status={props.user.status}
                />
            </div>
        </div>
    )
};

export default User;