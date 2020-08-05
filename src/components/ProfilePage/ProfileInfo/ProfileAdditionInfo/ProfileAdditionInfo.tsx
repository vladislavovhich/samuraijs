import React from "react";
import ProfileField from "./ProfileField";

type PropsType = {
    isUpdatingProfile:boolean
    lookingForAJob:boolean
    lookingForAJobDescription:string|null
    aboutMe:string|null
};

const ProfileAdditionInfo: React.FC<PropsType> = (props) => {
    return (
        <div className="Profile__additionInfo d-flex flex-column">
            <ProfileField
                isUpdatingProfile={props.isUpdatingProfile}
                propVal={props.lookingForAJob ? "Да" : "Нет"}
                propName="Ищет работу:"
            />

            <div className="mt-2">
                <ProfileField
                    isUpdatingProfile={props.isUpdatingProfile}
                    propVal={props.lookingForAJobDescription || "Отсутствует"}
                    propName="Описание:"
                />
            </div>

            <div className="mt-2">
                <ProfileField
                    isUpdatingProfile={props.isUpdatingProfile}
                    propVal={props.aboutMe || "Пусто"}
                    propName="О пользователе:"
                />
            </div>
        </div>
    )
};

export default ProfileAdditionInfo;