import {createStore, combineReducers, applyMiddleware, Action} from "redux"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import authReducer from "./reducers/authReducer"
import profileReducer from "./reducers/profileReducer";
import appReducer from "./reducers/appReducer";
import usersReducer from "./reducers/usersReducer";

const reducers = combineReducers({
    auth: authReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    app: appReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>
export type StateType = ReturnType<typeof reducers>
export type CombineActions<T> = T extends {[key:string]: infer U} ? U : never

export default store