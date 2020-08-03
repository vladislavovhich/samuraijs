import React from "react";
import "../styles/Header.scss";
import MenuBtn from "./Menu/MenuBtn";

type PropsType = {};

const Header: React.FC<PropsType> = (props) => {
    return (
        <header className="Header flex-grow-0">
            <div className="container h-100 d-flex flex-row align-items-center justify-content-between">
                <div className="Logo">
                    SamuraiJS.com
                </div>

                <MenuBtn />
            </div>
        </header>
    )
};

export default Header;