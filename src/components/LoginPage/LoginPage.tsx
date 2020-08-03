import React from "react";
import {connect} from "react-redux";
import {StateType} from "../../store/store";
import {useFormik} from "formik";
import * as Yup from "yup";
import "../../styles/LoginPage/LoginPage.scss";
import {Redirect} from "react-router-dom";
import {AuthDataType} from "../../api/AuthAPI";
import {actions, thunks} from "../../store/reducers/authReducer";
import CircleSmallPrealoder from "../Common/CircleSmallPrealoder";
import FormikField from "./FormikField";
import CaptchaBlock from "./CaptchaBlock";
import {authSelector} from "../../selectors/authSelector";

const {toggleGettingCaptchaImg} = actions;
const {login, getCaptchaUrl} = thunks;

type PropsMapStateToProps = {
    isAuthorized:boolean
    loginErrors:string
    isAuthorizing:boolean
    isGettingCaptchaUrl:boolean
    captchaUrl:string|null
    isGettingCaptchaImg:boolean
};
type PropsMapDispatchToProps = {
    login:(loginData:AuthDataType) => void
    getCaptchaUrl:() => void
    toggleGettingCaptchaImg: (value:boolean) => void
};

type Props = PropsMapStateToProps & PropsMapDispatchToProps;

const LoginPage: React.FC<Props> = (props) => {
    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
            captcha: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .min(5, "Должно быть больше 5 символов!")
                .max(25, "Должно быть не больше 25 символов!")
                .email("Неправильный логин!")
                .required("Вы забыли логин!"),
            password: Yup.string()
                .min(5, "Должно быть больше 5 символов!")
                .max(25, "Должно быть не больше 25 символов!")
                .required("Вы забыли пароль!")

        }),
        onSubmit(values) {
            props.login(values);
        },
    });
    const captchaField = (
        <div className="mt-2 d-flex align-items-center">
            <FormikField
                name="captcha"
                placeholder="Каптча…"
                value={formik.values.captcha}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                touched={formik.touched.captcha}
                errors={formik.errors.captcha}
                type="text"
            />
        </div>
    )

    if (props.isAuthorized) {
        return (
            <Redirect to="/profile"/>
        )
    }

    return (
        <div className="LoginPage d-flex align-items-center justify-content-center flex-column w-100 h-100">
            <form onSubmit={formik.handleSubmit} className="Form d-flex flex-column align-items-center">
                <div className="LoginHead">
                    Введите логин:
                </div>

                {!!props.loginErrors && (
                    <div className="ErrorField mt-1">
                        {props.loginErrors}
                    </div>
                )}

                <div className="mt-2 d-flex align-items-center">
                    <FormikField
                        name="email"
                        placeholder="Почта…"
                        value={formik.values.email}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        touched={formik.touched.email}
                        errors={formik.errors.email}
                        type="text"
                    />
                </div>

                <div className="mt-2 d-flex align-items-center">
                    <FormikField
                        name="password"
                        placeholder="Пароль…"
                        value={formik.values.password}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        touched={formik.touched.password}
                        errors={formik.errors.password}
                        type="password"
                    />
                </div>


                {
                    (props.captchaUrl || props.isGettingCaptchaUrl) && (
                        <CaptchaBlock
                            isVisiblePreloader={props.isGettingCaptchaUrl}
                            captchaUrl={props.captchaUrl}
                            captchaField={captchaField}
                            isGettingCaptchaImg={props.isGettingCaptchaImg}


                            getCaptchaUrl={props.getCaptchaUrl}
                            toggleGettingCaptchaImg={props.toggleGettingCaptchaImg}
                        />
                    )
                }
                {
                    (props.isAuthorizing || props.isGettingCaptchaImg || props.isGettingCaptchaUrl) ? (
                        <div className="LoginBtn d-flex align-items-center justify-content-center mt-3">
                            <CircleSmallPrealoder />
                        </div>
                    ) : (
                        <input type="submit" value="Войти" className="LoginBtn mt-3"/>
                    )
                }
                <a href="https://social-network.samuraijs.com/signUp" className="SignUp mt-1">
                    Зарегестрироваться
                </a>
            </form>
        </div>
    )
}

const mapStateToProps = (state: StateType): PropsMapStateToProps => ({
    isAuthorized: state.app.isAuthorized,
    loginErrors: authSelector.getLoginErrors(state),
    isAuthorizing: authSelector.getIsAuthorizing(state),
    isGettingCaptchaUrl: authSelector.getIsGettingCaptchaUrl(state),
    captchaUrl: authSelector.getCaptchaUrl(state),
    isGettingCaptchaImg: authSelector.getIsGettingCaptchaImg(state)
});
const mapDispatchToProps: PropsMapDispatchToProps = {
    login,
    getCaptchaUrl,
    toggleGettingCaptchaImg
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);