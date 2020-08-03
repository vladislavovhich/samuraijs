import React from "react";
import "../../styles/Menu/Menu.scss";
import MenuNavLink from "./MenuNavLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {StateType} from "../../store/store";
import {connect} from "react-redux";
import {thunks} from "../../store/reducers/authReducer";
import HorizontalSmallPreloader from "../Common/HorizontalSmallPreloader";

const {logout} = thunks;

type PropsMapStateToProps = {
    isLogouting:boolean
    isAuthorized:boolean
}
type PropsMapDispatchToProps = {
    logout:() => void
}
type PropsType = PropsMapStateToProps & PropsMapDispatchToProps & {
    classNameProp:string
    onClickHideMenu:() => void
};

const Menu: React.FC<PropsType> = (props) => {
    const onClickLogout = () => {
        props.logout();
    }

    return (
        <div className="row">
            <div className={`Menu ${props.classNameProp} col-lg-2 col-md-4 col-sm-5 col-xs-6 col-8`} >
                <ul className="d-flex flex-column align-items-center w-100">
                    <li>
                        <a
                            href="#"
                            className="MenuNavLink d-flex flex-row align-items-center"
                            onClick={props.onClickHideMenu}
                        >
                            <FontAwesomeIcon icon="times" fixedWidth={true}/>
                            <div>Скрыть меню</div>
                        </a>
                    </li>
                    {
                        (props.isAuthorized) ? (
                            (props.isLogouting) ? (
                                <div className="PrealoderBar d-flex align-items-center justify-content-center">
                                    <HorizontalSmallPreloader/>
                                </div>
                            ) : (
                                <li>
                                    <a
                                        href="#"
                                        className="MenuNavLink d-flex flex-row align-items-center"
                                        onClick={onClickLogout}
                                    >
                                        <FontAwesomeIcon icon="sign-out-alt" fixedWidth={true}/>
                                        <div>Выйти</div>
                                    </a>
                                </li>
                            )
                        ) : (
                            <li>
                                <MenuNavLink
                                    text="Войти"
                                    icon="sign-in-alt"
                                    url="/login"
                                    hideMenu={props.onClickHideMenu}
                                />
                            </li>
                        )
                    }
                    <li className="w-100">
                        <div className="hr"/>
                    </li>
                    <li>
                        <MenuNavLink
                            text="Профиль"
                            icon="user"
                            url="/profile"
                            hideMenu={props.onClickHideMenu}
                        />
                    </li>
                    <li>
                        <MenuNavLink
                            text="Пользователи"
                            icon="users"
                            url="/users"
                            hideMenu={props.onClickHideMenu}
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
};

const mapStateToProps = (state:StateType):PropsMapStateToProps => ({
    isAuthorized: state.app.isAuthorized,
    isLogouting: state.auth.isLogouting
});
const mapDispatchToProps:PropsMapDispatchToProps = {
    logout
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);