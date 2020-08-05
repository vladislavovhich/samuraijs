import React from "react";
import {UserType} from "../../store/types";
import User from "./User/User";

type PropsType = {
    users:UserType[]
    disabledBtns:number[]
    isFollowing:boolean
    isAuthorized:boolean

    follow: (id:number, index:number) => void
    unfollow: (id:number, index:number) => void
};

const Users: React.FC<PropsType> = (props) => {
    return (
        <div className="Users my-2">
            {props.users.map((user: UserType, index:number) => (
                <User
                    user={user}
                    isFollowing={props.isFollowing}
                    isDisabled={props.disabledBtns.some((id) => id === user.id) || !props.isAuthorized}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    index={index}
                    isAuthorized={props.isAuthorized}

                    key={user.id}
                />
            ))}
        </div>
    )
};

export default Users;