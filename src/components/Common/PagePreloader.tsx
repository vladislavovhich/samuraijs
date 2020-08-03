import React from "react";
import "../../styles/Common/PagePrealoder.scss";

type PropsType = {};

const PagePreloader: React.FC<PropsType> = (props) => {
    return (
        <div className="PagePrealoder cssload-thecube">
            <div className="cssload-cube cssload-c1"/>
            <div className="cssload-cube cssload-c2"/>
            <div className="cssload-cube cssload-c4"/>
            <div className="cssload-cube cssload-c3"/>
        </div>
    )
};

export default PagePreloader;