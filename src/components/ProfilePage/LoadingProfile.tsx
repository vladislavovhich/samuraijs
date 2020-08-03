import React from "react";
import UserAvatarLoadingBig from "../UserAvatar/UserAvatarLoadingBig";
import FollowedLoading from "./FollowedLoading";
import HorizontalGraySmallPreloader from "../Common/HorizontalGraySmallPreloader";
import "../../styles/profilePage/LoadingProfile.scss";

type PropsType = {
    isYourPage:boolean
    isAuthorized:boolean
};

const LoadingProfile: React.FC<PropsType> = (props) => {
    return (
        <div className="LoadingProfile d-flex flex-column">
            <div className="d-flex flex-row">
                <div className="d-flex flex-column">
                    <UserAvatarLoadingBig/>
                    {(!props.isYourPage && props.isAuthorized) && <FollowedLoading/>}
                </div>

                <div className="LoadingProfile__info ml-2 d-flex flex-column align-items-start ">
                    <div className="PrealoderName d-flex justify-content-center flex-grow-0">
                        <HorizontalGraySmallPreloader/>
                    </div>
                    <div className="PrealoderStatus mt-2 d-flex align-items-center justify-content-center">
                        <HorizontalGraySmallPreloader/>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column mt-3">
                <div className="hr" />

                <div className="PrealoderName d-flex justify-content-center mt-3">
                    <HorizontalGraySmallPreloader/>
                </div>
                <div className="PrealoderName d-flex justify-content-center mt-2">
                    <HorizontalGraySmallPreloader/>
                </div>
                <div className="PrealoderName d-flex justify-content-center mt-2">
                    <HorizontalGraySmallPreloader/>
                </div>

                <div className="hr mt-3" />
            </div>
        </div>
    )
};

export default LoadingProfile;