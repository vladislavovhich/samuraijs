import React from "react";
import HorizontalSmallPreloader from "../Common/HorizontalSmallPreloader";
import "../../styles/UsersPage/FollowBtn.scss";

type PropsType = {
    isDisabled:boolean
    isFollowing:boolean
    isFollowed:boolean
    followUnfollow: () => void
    extraCondition:boolean
};

const FollowBtn: React.FC<PropsType> = (props) => {
    return (
        <button
            className="mt-2 FollowBtn"
            disabled={props.isDisabled}
            onClick={props.followUnfollow}
        >

            {(props.isDisabled) ? (
                (props.isDisabled && props.extraCondition) ? (
                        <HorizontalSmallPreloader />
                    ) :
                    (
                        (props.isFollowed ? "Удалить" : "Добавить")
                    )
            ) : (
                (props.isFollowed ? "Удалить" : "Добавить")
            )}
        </button>
    )
};

export default FollowBtn;