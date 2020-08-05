import React from "react";
import HorizontalGraySmallPreloader from "../../Common/HorizontalGraySmallPreloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

type PropsType = {
    isUpdatingProfile:boolean
    fullName:string
    isGettingProfileStatus:boolean
    profileStatus:string
    setProfileStatus: (status:string) => void
    isYourPage:boolean
};

const ProfileTextInfo: React.FC<PropsType> = (props) => {
    return (
        <div className="Profile__textInfo d-flex flex-column">
            <div className="Profile__name flex-grow-0">
                {
                    (props.isUpdatingProfile) ? (
                        <div className="PrealoderName mb-1 d-flex justify-content-center flex-grow-0">
                            <HorizontalGraySmallPreloader/>
                        </div>
                    ) : (
                        props.fullName
                    )
                }
            </div>
            <ProfileStatus
                isGettingProfileStatus={props.isGettingProfileStatus}
                profileStatus={props.profileStatus}
                setProfileStatus={props.setProfileStatus}
                isYourPage={props.isYourPage}
            />
        </div>
    )
};

export default ProfileTextInfo;