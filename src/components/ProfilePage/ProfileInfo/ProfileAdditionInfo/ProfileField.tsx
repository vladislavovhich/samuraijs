import React from "react";
import HorizontalSmallPreloader from "../../../Common/HorizontalSmallPreloader";

type PropsType = {
    isUpdatingProfile:boolean
    propVal:string
    propName:string
};

const ProfileField: React.FC<PropsType> = (props) => {
    return (
        <div className="ProfileField d-flex flex-row">
            <div className="PropName">
                {props.propName}
            </div>
            <div className="PropVal d-flex align-items-center justify-content-center">
                {props.isUpdatingProfile ? (
                    <HorizontalSmallPreloader />
                ) : (
                    props.propVal
                )}
            </div>
        </div>
    )
};

export default ProfileField;