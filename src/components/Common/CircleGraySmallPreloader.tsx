import React from "react";
import "../../styles/Common/CircleGraySmallPreloder.scss";

type PropsType = {};

const CircleGraySmallPreloader: React.FC<PropsType> = (props) => {
    return (
        <div className="CircleGraySmallPreloader" id="circularG">
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

export default CircleGraySmallPreloader;