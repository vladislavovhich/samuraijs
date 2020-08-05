import React from "react";

type PropsType = {
    propName:string
    Field:React.ReactElement
};

const ProfileFormItem: React.FC<PropsType> = (props) => {
    return (
        <div className="ProfileFormItem d-flex flex-row">
            <div className="PropName">
                {props.propName}
            </div>
            <div className="ml-2 d-flex flex-row align-items-center">
                {props.Field}
            </div>
        </div>
    )
};

export default ProfileFormItem;