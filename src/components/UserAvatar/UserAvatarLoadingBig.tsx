import React from "react";
import "../../styles/UserAvatar/UserAvatarLoadingBig.scss";
import CircleGrayBigPreloader from "../Common/CircleGrayBigPreloader";

type PropsType = {};

const UserAvatarLoadingBig: React.FC<PropsType> = (props) => {
    return (
        <div className="UserAvatarLoadingBig d-flex align-items-center justify-content-center">
            <CircleGrayBigPreloader />
        </div>
    )
};

export default UserAvatarLoadingBig;