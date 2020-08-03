import React from "react";
import "../styles/PageNotFound.scss";

type PropsType = {};

const PageNotFound: React.FC<PropsType> = (props) => {
    return (
        <div className="PageNotFound w-100 h-100 d-flex align-items-center justify-content-center flex-column">
            <div className="header">Ошибка 404</div>
            <div className="text">Страница, которую вы ищите, не найдена…</div>
        </div>
    )
};

export default PageNotFound;