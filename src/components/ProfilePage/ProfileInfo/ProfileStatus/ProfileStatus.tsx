import React, {useState} from "react";
import HorizontalGraySmallPreloader from "../../../Common/HorizontalGraySmallPreloader";
import ProfileStatusEditing from "./ProfileStatusEditing";

type PropsType = {
    isGettingProfileStatus:boolean
    profileStatus:null|string
    setProfileStatus: (status:string) => void
    isYourPage:boolean
};

const ProfileStatus: React.FC<PropsType> = (props) => {
    const [editing, toggleEditing] = useState<boolean>(false);

    const onDoubleClick = () => {
        if (props.isYourPage) {
            toggleEditing(true);
        }
    }
    const onBlur = (value:string) => {
        if (value !== props.profileStatus) {
            props.setProfileStatus(value);
        }

        toggleEditing(false);
    }

    return (
        <div className="Profile__status">
            {
                (props.isGettingProfileStatus) ? (
                    <div
                        className="PrealoderStatus mt-2 d-flex align-items-center justify-content-center">
                        <HorizontalGraySmallPreloader/>
                    </div>
                ) : (
                    (editing) ? (
                        <ProfileStatusEditing
                            value={props.profileStatus || ""}
                            onBlur={onBlur}
                        />
                    ) : (
                        <p onDoubleClick={onDoubleClick}>
                            {props.profileStatus || "Нет статуса"}
                        </p>
                    )
                )
            }
        </div>
    )
};

export default ProfileStatus;