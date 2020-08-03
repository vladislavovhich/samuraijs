import React from "react";
import HorizontalSmallPreloader from "../Common/HorizontalSmallPreloader";

type PropsType = {};

const FollowedLoading: React.FC<PropsType> = (props) => {
    return (
        <div className="FollowedLoading mt-3 d-flex align-items-center justify-content-center">
            <HorizontalSmallPreloader />
        </div>
    )
};

export default FollowedLoading;