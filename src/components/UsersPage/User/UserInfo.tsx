import React from "react";
import {NavLink} from "react-router-dom";

type PropsType = {
    id:number
    name:string
    status:string|null
};

const UserInfo: React.FC<PropsType> = (props) => {
    return (
        <div className="User__info d-flex flex-column">
            <div className="User__name">
                <NavLink to={`/profile/${props.id}`}>
                    {props.name}
                </NavLink>
            </div>
            <div className="User__status">
                {props.status || "Нет статуса"}
            </div>
        </div>
    )
};

export default UserInfo;