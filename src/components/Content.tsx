import React, {useEffect} from "react";
import {connect} from "react-redux";
import {StateType} from "../store/store";
import {Switch, Route, Redirect} from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import PagePreloader from "./Common/PagePreloader";
import {thunks} from "../store/reducers/authReducer";
import PageNotFound from "./PageNotFound";
import UsersContainer from "./UsersPage/UsersContainer";
import ProfileContainer from "./ProfilePage/ProfileContainer";
import withAuthorized from "../HOC/withAuthorized";

const {loginMe} = thunks;

type PropsMapStateToProps = {
    isAuthorizingMe:boolean
};
type PropsMapDispatchToProps = {
    loginMe: () => void
};

type Props = PropsMapStateToProps & PropsMapDispatchToProps;

const Prealoder = () => {
    return (
        <div className="w-100 h-100 overflow-hidden d-flex align-items-center justify-content-center">
            <PagePreloader />
        </div>
    )
}
const Content: React.FC<Props> = (props) => {
    useEffect(() => {
        props.loginMe();
    }, []);

    return (
        <div className="Content w-100 h-100">
            <div className="container w-100 h-100 ">
                {(props.isAuthorizingMe) ? (
                    <Prealoder />
                ) : (
                    <>
                        <Switch>
                            <Route exact path="/login" component={LoginPage}/>
                            <Route exact path="/users" component={UsersContainer}/>
                            <Route exact path="/profile/:id(\d+)" component={ProfileContainer}/>
                            <Route exact path="/profile" component={withAuthorized(ProfileContainer)} />
                            <Redirect from="/" to="/login"/>
                            <Route component={PageNotFound}/>
                        </Switch>
                    </>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state: StateType): PropsMapStateToProps => ({
    isAuthorizingMe: state.auth.isAuthorizingMe
});
const mapDispatchToProps: PropsMapDispatchToProps = {
    loginMe
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);