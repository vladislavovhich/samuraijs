import React from "react";
import "../styles/App.scss";
import Header from "./Header";
import Main from "./Main";

type PropsType = {};

const App: React.FC<PropsType> = (props) => {
    return (
        <div className="App d-flex flex-column w-100 h-100">
            <Header />
            <Main />
        </div>
    )
};

export default App;