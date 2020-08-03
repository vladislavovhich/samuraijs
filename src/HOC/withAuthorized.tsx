import React from "react";
import {connect} from "react-redux";
import {StateType} from "../store/store";
import {Redirect} from "react-router-dom";

type PropsMapStateToProps = {
    isAuthorized:boolean
};

const withAuthorized = (Component:React.FC) => {
    type PropsType = {
        isAuthorized:boolean
    }

    const RedirectComponent:React.FC<PropsType> = (props) => {
        if (!props.isAuthorized) {
            return <Redirect to="/login"/>
        }

        return <Component {...props} />
    }
    const mapStateToProps = (state: StateType):PropsMapStateToProps => ({
        isAuthorized: state.app.isAuthorized
    });

    return connect(mapStateToProps)(RedirectComponent);
}

export default withAuthorized;