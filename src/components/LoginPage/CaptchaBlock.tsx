import React, {useState} from "react";
import HorizontalSmallPreloader from "../Common/HorizontalSmallPreloader";

type PropsType = {
    isVisiblePreloader:boolean
    captchaUrl:string|null
    getCaptchaUrl:() => void
    captchaField:React.ReactElement
    isGettingCaptchaImg:boolean
    toggleGettingCaptchaImg:(value:boolean) => void
    isAuthorizing:boolean
};

const CaptchaBlock: React.FC<PropsType> = (props) => {
    const extraClass = (props.isVisiblePreloader || props.isGettingCaptchaImg || props.isAuthorizing) ? "GetNewCaptchaDisabled" : "";

    const removeLoadingImg = () => {
        props.toggleGettingCaptchaImg(false);
    }
    const updateCaptcha = () => {
        props.getCaptchaUrl();
    }
    return (
        <div className="CaptchaBlock mt-2 d-flex flex-column align-items-center">
            <div className="Captcha d-flex align-items-center justify-content-center">
                {(props.isVisiblePreloader || props.isGettingCaptchaImg) && <HorizontalSmallPreloader/>}
                <img
                    src={!!props.captchaUrl ? props.captchaUrl : ""}
                    alt=""
                    onLoad={removeLoadingImg}
                    hidden={props.isGettingCaptchaImg || props.isVisiblePreloader}
                />
            </div>

            <a
                className={`GetNewCaptcha ${extraClass}`}
                onClick={updateCaptcha}
                href="#"
            >
                Сменить каптчу
            </a>

            {props.captchaField}
        </div>
    )
};

/*
<input
                type="text"
                name="captcha"
                onChange={formik.handleChange}
                value={formik.values.captcha}
                onBlur={formik.handleBlur}
                className="Input mt-2"
                placeholder="Каптча…"
            />
 */

export default CaptchaBlock;