import React, {useState} from "react";
import "../../../styles/Paginator/Paginator.scss";
import PaginatorItem from "./PaginatorItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type PropsType = {
    pageSize:number
    itemsAmount:number
    currentPageNumber:number
    portionSize:number
    isGettingItems:boolean

    onPageChange: (page:number) => void
};

const Paginator: React.FC<PropsType> = (props) => {
    const pagesAmount = Math.ceil(props.itemsAmount / props.pageSize);
    const [startIndex, setStartIndex] = useState<number>(props.currentPageNumber);

    const canBeShowedPrev = () => startIndex - props.portionSize >= 1;
    const canBeShowedNext = () => startIndex + props.portionSize <= pagesAmount;

    const extraClassToPagItems = props.isGettingItems ? "PaginatorItemsDisabled" : "";

    const showPrev = () => {
        if (canBeShowedPrev()) {
            setStartIndex(startIndex - props.portionSize);
        }
    }
    const showNext = () => {
        if (canBeShowedNext()) {
            setStartIndex(startIndex + props.portionSize);
        }
    }

    const pages:number[] = [];

    for (let i:number = startIndex, j:number = 0; i <= pagesAmount && j < props.portionSize; j++, i++) {
        pages.push(i);
    }

    return (
        <div className="Paginator pb-1 d-flex flex-row align-items-center justify-content-center">
            {
                canBeShowedPrev() && (
                    <button className="ShowPage mr-2" onClick={showPrev}>
                        <FontAwesomeIcon icon="angle-left"/>
                    </button>
                )
            }

            <div className={`${extraClassToPagItems} d-flex flex-row`}>
                {pages.map((page) => (
                    <PaginatorItem
                        page={page}
                        onPageChange={props.onPageChange}
                        isActive={props.currentPageNumber === page}
                        key={page}
                    />
                ))}
            </div>

            {
                canBeShowedNext() && (
                    <button className="ShowPage ml-2" onClick={showNext}>
                        <FontAwesomeIcon icon="angle-right"/>
                    </button>
                )
            }
        </div>
    )
};

export default Paginator;