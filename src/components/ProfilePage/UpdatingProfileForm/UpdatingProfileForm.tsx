import React from "react";
import {useFormik} from "formik";
import {UpdateProfileType} from "../../../api/ProfileAPI";
import FormikField from "../../LoginPage/FormikField";
import HorizontalSmallPreloader from "../../Common/HorizontalSmallPreloader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ProfileContactsType} from "../../../store/types";
import "../../../styles/profilePage/UpdatingProfileForm.scss";
import ProfileFormItem from "./ProfileFormItem";

type PropsType = {
    aboutMe:string
    fullName:string
    lookingForAJob:boolean
    lookingForAJobDescription:string
    contacts:ProfileContactsType
    userId:number

    isUpdatingProfile:boolean
    onClickUpdateProfile:(newProfile:UpdateProfileType) => void
};

const UpdatingProfileForm: React.FC<PropsType> = (props) => {
    const formik = useFormik({
        initialValues: {
            aboutMe: props.aboutMe,
            fullName: props.fullName,
            lookingForAJob: props.lookingForAJob,
            lookingForAJobDescription: props.lookingForAJobDescription,
            contacts: props.contacts,
            userId: props.userId

        },
        onSubmit(values) {
            props.onClickUpdateProfile(values);
        },
    });

    const fullNameField = (
        <FormikField
            name="fullName"
            placeholder="Ваше имя…"
            value={formik.values.fullName}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched.fullName}
            errors={formik.errors.fullName}
            type="text"
        />
    );
    const jobDescriptionField = (
        <FormikField
            name="lookingForAJobDescription"
            placeholder="Описание…"
            value={formik.values.lookingForAJobDescription || ""}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched.lookingForAJobDescription}
            errors={formik.errors.lookingForAJobDescription}
            type="text"
        />
    );
    const aboutMeField = (
        <FormikField
            name="aboutMe"
            placeholder="О вас…"
            value={formik.values.aboutMe || ""}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched.aboutMe}
            errors={formik.errors.aboutMe}
            type="text"
        />
    )
    const lookingJobField = (
        <>
            <input
                type="checkbox"
                name="lookingForAJob"
                checked={formik.values.lookingForAJob}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <div className="Val ml-1">
                {formik.values.lookingForAJob ? "Да" : "Нет"}
            </div>
        </>
    )

    return (
        <div className="UpdatingProfileForm mt-3">
            <ProfileFormItem
                propName="Имя:"
                Field={fullNameField}
            />

            <div className="mt-2">
                <ProfileFormItem
                    propName="Описание:"
                    Field={jobDescriptionField}
                />
            </div>

            <div className="mt-2">
                <ProfileFormItem
                    propName="О вас:"
                    Field={aboutMeField}
                />
            </div>

            <div className="mt-2">
                <ProfileFormItem
                    propName="Ищите работу:"
                    Field={lookingJobField}
                />
            </div>

            <button
                className="UpdateImgBtn mt-3 d-flex align-items-center justify-content-center"
                disabled={props.isUpdatingProfile}
                onClick={formik.submitForm}
            >
                {props.isUpdatingProfile ? (
                    <HorizontalSmallPreloader/>
                ) : (
                    <>
                        <FontAwesomeIcon icon="cog"/>
                        <div className="ml-1">Сохранить</div>
                    </>
                )}
            </button>
        </div>
    )
};

export default UpdatingProfileForm;