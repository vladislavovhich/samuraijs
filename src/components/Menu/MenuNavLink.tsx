import React from "react";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    IconLookup,
    IconDefinition,
    findIconDefinition,
    IconName
} from '@fortawesome/fontawesome-svg-core';
import "../../styles/Menu/MenuNavLink.scss";

type PropsType = {
    url:string
    icon:IconName
    text:string
    hideMenu: () => void
};

const MenuNavLink: React.FC<PropsType> = (props) => {
    const iconLookup:IconLookup = {
        prefix: 'fas',
        iconName:props.icon
    };
    const iconDefinition:IconDefinition = findIconDefinition(iconLookup);

    return (
        <NavLink onClick={props.hideMenu} to={props.url} className="MenuNavLink d-flex flex-row align-items-center">
            <FontAwesomeIcon icon={iconDefinition} fixedWidth={true}/>
            <div>{props.text}</div>
        </NavLink>
    )
};

export default MenuNavLink;