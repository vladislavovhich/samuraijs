import React from "react";
import {useFormik} from "formik";
import {UpdateProfileType} from "../../api/ProfileAPI";
import FormikField from "../LoginPage/FormikField";
import HorizontalSmallPreloader from "../Common/HorizontalSmallPreloader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ProfileContactsType} from "../../store/types";
import "../../styles/profilePage/UpdatingProfileForm.scss";

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

    return (
        <div className="UpdatingProfileForm mt-3">
            <div className="d-flex flex-row">
                <div className="PropName">
                    Имя:
                </div>
                <div className="ml-2">
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
                </div>
            </div>

            <div className="d-flex flex-row align-items-center mt-2">
                <div className="PropName">
                    Описание:
                </div>
                <div className="PropVal ml-2">
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
                </div>
            </div>

            <div className="d-flex flex-row align-items-center mt-2">
                <div className="PropName">
                    О вас:
                </div>
                <div className="PropVal ml-2">
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
                </div>
            </div>

            <div className="d-flex flex-row align-items-center mt-2">
                <div className="PropName">
                    Ищите работу:
                </div>
                <div className="PropVal d-flex align-items-center ml-2">
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
                </div>
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