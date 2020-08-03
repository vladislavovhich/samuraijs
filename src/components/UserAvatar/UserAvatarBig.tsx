import React from "react";
import "../../styles/UserAvatar/UserAvatarBig.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type PropsType = {};

const UserAvatarBig: React.FC<PropsType> = (props) => {
    return (
        <div className="UserAvatarBig d-flex justify-content-center align-items-end">
            <FontAwesomeIcon icon="user"/>
        </div>
    )
};

export default UserAvatarBig;