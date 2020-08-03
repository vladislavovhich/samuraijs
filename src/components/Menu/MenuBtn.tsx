import React, {useState} from "react";
import Menu from "./Menu";
import {findIconDefinition, IconDefinition, IconLookup} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../../styles/Menu/MenuBtn.scss";

type PropsType = {};

const MenuBtn: React.FC<PropsType> = (props) => {
    const iconLookup:IconLookup = {
        prefix: 'fas',
        iconName: 'bars'
    };
    const iconDefinition:IconDefinition = findIconDefinition(iconLookup);
    const [menuClassName, setMenuClassName] = useState<string>("MenuHide");

    const onClickShowMenu = () => {
        setMenuClassName("MenuVisible");
    }
    const onClickHideMenu = () => {
        setMenuClassName("MenuHidden");
    }

    return (
        <div>
            <a className="MenuBtn" href="#" onClick={onClickShowMenu}>
                <FontAwesomeIcon icon={iconDefinition}/>
            </a>
            <Menu
                classNameProp={menuClassName}
                onClickHideMenu={onClickHideMenu}
            />
        </div>
    )
};

export default MenuBtn;