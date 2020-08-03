import React from "react";
import {UserType} from "../../store/types";
import PagePreloader from "../Common/PagePreloader";
import Paginator from "../Common/Paginator/Paginator";
import {actions} from "../../store/reducers/usersReducer";
import User from "./User";
import Users from "./Users";
import {Props} from "./UsersContainer";

type PropsType = Props;

const UsersPage: React.FC<PropsType> = (props) => {
    const onPageChangeGetUsers = (page:number) => {
        props.setCurrentPage(page);
        props.getUsers(props.pageSize, page);
    }

    return (
        <div className="UsersPage w-100 h-100 d-flex flex-column py-3">
            <Paginator
                pageSize={props.pageSize}
                itemsAmount={props.usersTotalCount}
                currentPageNumber={props.currentPageNumber}
                portionSize={props.portionSize}
                isGettingItems={props.isGettingUsers}

                onPageChange={onPageChangeGetUsers}
            />

            {
                props.isGettingUsers ? (
                    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                        <PagePreloader />
                    </div>
                ) : (
                    <Users
                        users={props.users}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        disabledBtns={props.disabledBtns}
                        isFollowing={props.isFollowing}
                        isAuthorized={props.isAuthorized}
                    />
                )
            }
        </div>
    )
};

export default UsersPage;