import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import "bootstrap/dist/css/bootstrap.min.css"
import store from "./store/store"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import App from "./components/App"
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCog,faUserFriends, faUser, faUsers, faBars, faTimes, faSignInAlt, faSignOutAlt,
faAngleLeft, faDownload,faAngleRight} from "@fortawesome/free-solid-svg-icons"
import "animate.css/animate.min.css"

library.add(faCog,faDownload, faUserFriends, faUser, faUsers, faBars, faTimes, faSignInAlt, faSignOutAlt, faAngleLeft, faAngleRight)

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.register()
