import React from "react";
import "../../styles/Common/CircleSmallPreloder.scss";

type PropsType = {};

const CircleSmallPrealoder: React.FC<PropsType> = (props) => {
    return (
        <div className="CircleSmallPreloader" id="circularG">
            <div id="circularG_1" className="circularG" />
            <div id="circularG_2" className="circularG" />
            <div id="circularG_3" className="circularG" />
            <div id="circularG_4" className="circularG" />
            <div id="circularG_5" className="circularG" />
            <div id="circularG_6" className="circularG" />
            <div id="circularG_7" className="circularG" />
            <div id="circularG_8" className="circularG" />
        </div>
    )
};

export default CircleSmallPrealoder;