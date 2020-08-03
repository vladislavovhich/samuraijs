import React, {useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../../styles/profilePage/UpdateImgBtn.scss";
import HorizontalSmallPreloader from "../Common/HorizontalSmallPreloader";

type PropsType = {
    isDisabled:boolean
    updatePhoto:(photo:Blob) => void
};

const UpdateImgBtn: React.FC<PropsType> = (props) => {
    const fileRef = useRef<HTMLInputElement>(null);

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files[0].type.startsWith("image")) {
                props.updatePhoto(e.target.files[0]);
            } else {
                alert("Тут должно быть изображение!");
            }
        }
    }
    const triggerFileInput = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }
    const onClick = () => {
        triggerFileInput();
    }

    return (
        <>
            <button
                className="UpdateImgBtn mt-2 d-flex align-items-center justify-content-center"
                disabled={props.isDisabled}
                onClick={onClick}
            >
                {props.isDisabled ? (
                    <HorizontalSmallPreloader/>
                ) : (
                    <>
                        <FontAwesomeIcon icon="download"/>
                        <div className="ml-1">Фото</div>
                    </>
                )}
            </button>

            <input type="file" name="file" onChange={onChange} hidden={true} ref={fileRef}/>
        </>
    )
};

export default UpdateImgBtn;