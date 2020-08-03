import React from "react";
import "../../styles/Common/HorizontalSmallPreloader.scss";

type PropsType = {};

const HorizontalSmallPreloader: React.FC<PropsType> = (props) => {
    return (
        <div className="HorizontalSmallPreloader" id="circleG">
            <div id="circleG_1" className="circleG" />
            <div id="circleG_2" className="circleG" />
            <div id="circleG_3" className="circleG" />
        </div>
    )
};

export default HorizontalSmallPreloader;