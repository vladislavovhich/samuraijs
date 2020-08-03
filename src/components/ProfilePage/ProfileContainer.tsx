import React, {useEffect} from "react";
import {connect} from "react-redux";
import {StateType} from "../../store/store";
import ProfilePage from "./ProfilePage";
import {ProfileType} from "../../store/types";
import {profileSelector} from "../../selectors/profileSelector";
import {thunks, actions} from "../../store/reducers/profileReducer"
import { RouteComponentProps, Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {UpdateProfileType} from "../../api/ProfileAPI";

const {getProfile, getProfileStatus, follow,
    unfollow, checkIsFollowed, setProfileStatus,
    updateProfilePhoto, updateProfile} = thunks;
const {toggleGettingProfileImg} = actions;

type PropsMapStateToProps = {
    profile:ProfileType|null
    profileStatus:string|null
    userId:number
    followed:boolean
    isAuthorized:boolean

    isFollowing:boolean
    isGettingProfileImg:boolean
    isGettingProfile:boolean
    isGettingProfileStatus:boolean
    isUpdatingProfile:boolean
};
type PropsMapDispatchToProps = {
    getProfile: (userId:number) => void
    getProfileStatus: (userId:number) => void
    setProfileStatus: (status:string) => void
    toggleGettingProfileImg: (value:boolean) => ReturnType<typeof toggleGettingProfileImg>
    updateProfilePhoto:(photo:Blob) => void
    updateProfile:(newProfile:UpdateProfileType) => void

    follow: (id:number) => void
    unfollow: (id:number) => void
    checkIsFollowed: (id:number) => void
};

interface MatchType {
    id:string
}
interface ChildComponentProps {
    history : History
}
export type Props = PropsMapStateToProps & PropsMapDispatchToProps & RouteComponentProps<MatchType> & ChildComponentProps;

const ProfileContainer: React.FC<Props> = (props) => {
    const isYourPage = props.history.location.pathname === "/profile";

    useEffect(() => {
        let id:number

        if (!!props.match.params.id) {
            id = parseInt(props.match.params.id);
        } else {
            id = props.userId;
        }

        if (!isYourPage && props.isAuthorized) {
            props.checkIsFollowed(id);
        }

        props.getProfile(id);
        props.getProfileStatus(id);
    }, []);

    if (parseInt(props.match.params.id) === props.userId) {
        return <Redirect to="/profile" />
    }

    return (
        <ProfilePage
            isYourPage={isYourPage}
            {...props}
        />
    )
}

const mapStateToProps = (state: StateType): PropsMapStateToProps => ({
    profile: profileSelector.getProfile(state),
    profileStatus: profileSelector.getProfileStatus(state),
    userId: state.app.userId,
    followed: profileSelector.getFollowed(state),

    isAuthorized: state.app.isAuthorized,
    isUpdatingProfile: profileSelector.getUpdatingProfile(state),
    isFollowing: profileSelector.getFollowing(state),
    isGettingProfileImg: profileSelector.getGettingProfileImg(state),
    isGettingProfile: profileSelector.getGettingProfile(state),
    isGettingProfileStatus: profileSelector.getGettingProfileStatus(state)
});
const mapDispatchToProps: PropsMapDispatchToProps = {
    getProfile, getProfileStatus, toggleGettingProfileImg,
    follow, unfollow, updateProfile,
    checkIsFollowed, setProfileStatus, updateProfilePhoto
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(ProfileContainer) as React.FC;