import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Login from "./pages/login/login";

import { Route, withRouter } from "react-router-dom";
import AppRoutes from "./App-routes";
import { Layout } from "antd";

import { connect } from "react-redux";
import "./App.scss";
import "react-notifications/lib/notifications.css";

function App(props) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <BrowserRouter>
      <div className="main-container">
        <Layout>
          {/* {!props.isLoginSuccess && <Route path="/" component={Login} />}
          {props.isLoginSuccess && ( */}
            <React.Fragment>
              <AppRoutes
                isLoginSuccess={props.isLoginSuccess}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                history={props.history}
              />
            </React.Fragment>
          {/* )} */}
        </Layout>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  isLoginPending: state.mainViewState.isLoginPending,
  isLoginSuccess: state.mainViewState.isLoginSuccess,
  loginError: state.mainViewState.loginError,
  userData: state.mainViewState.userData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
