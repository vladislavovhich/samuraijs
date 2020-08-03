import React from "react";
import "../styles/Main.scss";
import Content from "./Content";

type PropsType = {};

const Main: React.FC<PropsType> = (props) => {
    return (
        <main className="Main flex-grow-1 w-100">
            <Content />
        </main>
    )
};

export default Main;