import React from "react";
import "../../styles/UserAvatar/UserAvatarSmall.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type PropsType = {};

const UserAvatarSmall: React.FC<PropsType> = (props) => {
    return (
        <div className="UserAvatarSmall d-flex justify-content-center align-items-end">
            <FontAwesomeIcon icon="user"/>
        </div>
    )
};

export default UserAvatarSmall;