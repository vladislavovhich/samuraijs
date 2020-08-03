import instance from "./API";
import {UserType} from "../store/types";

type GetUsersType = {
    items: UserType[]
    totalCount:number
    error:string|null
}
type GetFollowType = {
    resultCode:number
    messages:string[]
    data: object
}

const UsersAPI = {
    getUsers: (pageSize:number, currentPageNumber:number) => {
        return instance.get<GetUsersType>(`/users?page=${currentPageNumber}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow: (id:number) => {
        return instance.post<GetFollowType>(`/follow/${id}`).then(response => response.data);
    },
    unfollow: (id:number) => {
        return instance.delete<GetFollowType>(`/follow/${id}`).then(response => response.data);
    }
}

export default UsersAPI;

