import React, {useEffect} from "react";
import {connect} from "react-redux";
import {StateType} from "../../store/store";
import UsersPage from "./UsersPage";
import {UserType} from "../../store/types";
import {thunks} from "../../store/reducers/usersReducer";
import {actions} from "../../store/reducers/usersReducer";
import {usersSelector} from "../../selectors/usersSelector";

const {setCurrentPage, setUsers} = actions;
const {getUsers, follow, unfollow} = thunks;

type PropsMapStateToProps = {
    users:UserType[]
    usersTotalCount:number
    currentPageNumber:number
    pageSize:number
    portionSize:number
    disabledBtns:number[]
    isAuthorized:boolean

    isFollowing:boolean
    isGettingUsers:boolean
};
type PropsMapDispatchToProps = {
    setUsers: (users:UserType[]) => ReturnType<typeof setUsers>
    getUsers: (pageSize:number, currentPageNumber:number) => void
    follow: (id:number, index:number) => void
    unfollow: (id:number, index:number) => void

    setCurrentPage: (page:number) => ReturnType<typeof setCurrentPage>
};

export type Props = PropsMapStateToProps & PropsMapDispatchToProps;

const UsersContainer: React.FC<Props> = (props) => {
    useEffect(() => {
        props.getUsers(props.pageSize, props.currentPageNumber);

        return () => {
            props.setCurrentPage(1);
            props.setUsers([]);
        }
    }, []);

    return <UsersPage {...props}/>

}

const mapStateToProps = (state: StateType): PropsMapStateToProps => ({
    users: usersSelector.getUsers(state),
    usersTotalCount: usersSelector.getUsersTotalCount(state),
    currentPageNumber: usersSelector.getCurrentPageNumber(state),
    pageSize: usersSelector.getPageSize(state),
    portionSize: usersSelector.getPortionSize(state),
    disabledBtns: usersSelector.getDisabledBtns(state),
    isAuthorized: state.app.isAuthorized,

    isFollowing: usersSelector.getIsFollowing(state),
    isGettingUsers: usersSelector.getIsGettingUsers(state)
});
const mapDispatchToProps: PropsMapDispatchToProps = {
    getUsers,
    setCurrentPage,
    follow,
    unfollow,
    setUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);