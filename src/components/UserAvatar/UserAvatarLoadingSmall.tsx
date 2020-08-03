import React from "react";
import "../../styles/UserAvatar/UserAvatarLoadingSmall.scss";
import CircleGraySmallPreloader from "../Common/CircleGraySmallPreloader";

type PropsType = {};

const UserAvatarLoadingSmall: React.FC<PropsType> = (props) => {
    return (
        <div className="UserAvatarLoadingSmall d-flex align-items-center justify-content-center">
            <CircleGraySmallPreloader />
        </div>
    )
};

export default UserAvatarLoadingSmall;