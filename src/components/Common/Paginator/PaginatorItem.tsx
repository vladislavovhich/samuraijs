import React from "react";
import "../../../styles/Paginator/PaginatorItem.scss";

type PropsType = {
    page:number
    isActive:boolean
    onPageChange: (page:number) => void
};

const PaginatorItem: React.FC<PropsType> = (props) => {
    const extraClass = props.isActive ? "PaginatorItemActive" : "";

    const onPageChange = () => {
        props.onPageChange(props.page);
    }

    return (
        <div
            className={`PaginatorItem ${extraClass} d-flex align-items-center justify-content-center`}
            onClick={onPageChange}
        >
            {props.page}
        </div>
    )
};

export default PaginatorItem;