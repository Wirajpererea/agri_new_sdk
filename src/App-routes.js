import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "./components";

import LicencePage from "./pages/licence/licence";
import ConnectionsPage from "./pages/connections/connections";
import UserManagement from "./pages/user-management/userManagement";
import UserManagementBatch from "./pages/user-management/userManagement-batch";
import ModelBuild from "./pages/model-build/model-build";

import DataDictionaryPage from "./pages/data-dictionary/datadictionary";
import Dashboard from "./pages/dashboard/dashboardPage";
import Products from "./pages/products/products";
import BuildModel from "./pages/build-model/BuildModel";
import JupyterNotebook from "./pages/jupyter-notebook/JupyterNotebook";
import LoadData from "./pages/load-data/loadData";
import ModelsPage from "./pages/models/models";
import CreateAccount from "./pages/create-account/createAccount";
import DataPage from "./pages/build-data/buildData";
import DataModels from "./pages/data-models/datamodels";
import ManageVideos from "./pages/video-management/videoManagement";
import ModelSetup from "./pages/model-setup/modelSetup";
import ManageAnalyties from "./pages/manage-analyties/manageAnalyties";
import SystemParamter from "./pages/system-parameter/systemParameter";
import LoginAuthentcationCode from "./pages/login-auth-code/loginAuthCode";
import LoginAuthQRCOde from "./pages/login-auth-qr-code/loginQRCode";

import { connect } from "react-redux";
import { HeaderNav, SiderComponet } from "./components";
import { Layout } from "antd";
import { useHistory } from "react-router-dom";
import { setUserModelBuildsAction } from "./pages/login/actions/login-action";
import {
  resetLoadDataAction,
  loadPipelineSelectionDataAction,
} from "./pages/load-data/actions/loadData-action";
import sessionStorage from "redux-persist/es/storage/session";
import login from "./pages/login/login";
import orders from "./pages/orders/orders";
import profile from "./pages/profile/profile";

const { Content } = Layout;

const AppRoutes = ({
  configData,
  setActiveModel,
  collapsed,
  setCollapsed,
  isLoginSuccess,
  firstTimeLogin,
  setUserModelBuilds,
  userData,
  resetLoadData,
  loadPipelineSelectionData,
}) => {
  const history = useHistory();
  const verifiedLoginresult = sessionStorage.getItem("verifiedLogin");

  // useEffect(() => {
  //   if (isLoginSuccess && history && typeof firstTimeLogin !== "undefined") {
  //     if (firstTimeLogin) {
  //       history.push("/create-account");
  //     } else {
  //       if (
  //         window.location.pathname === "/login" ||
  //         window.location.pathname === "/create-account"
  //       ) {
  //         const { UserID } = userData;

  //         if (userData.Enforce2fa === true && userData.IsLoggedUser !== true) {
  //           history.push("/login-auth-qr-code");
  //         } else if (
  //           userData.Enforce2fa === true &&
  //           userData.IsLoggedUser === true
  //         ) {
  //           history.push("/login-auth-code");
  //         } else {
  //           history.push("/");
  //         }

  //         setUserModelBuilds({
  //           userId: UserID,
  //         });
  //       } else {
  //         const { UserID } = userData;
  //         history.push(window.location.pathname);
  //         setUserModelBuilds({
  //           userId: UserID,
  //         });
  //       }
  //     }
  //   }
  //   if (!isLoginSuccess) {
  //     history.push("/login");
  //   }
  // }, [firstTimeLogin, history, isLoginSuccess, setUserModelBuilds, userData]);

  const loadLoadDataPage = (props) => {
    // resetLoadData();
    loadPipelineSelectionData();
    history.push({
      pathname: "/load-data",
      state: { name: "fromSider" },
    });
  };

  return (
    <React.Fragment>
      <ErrorBoundary>
        <Switch>
          {/* {userData.Enforce2fa ? (
            !userData.IsLoggedUser ? (
              <>
                <Route
                  exact
                  path="/login-auth-qr-code"
                  component={LoginAuthQRCOde}
                />
                <Route
                  exact
                  path="/login-auth-code"
                  component={LoginAuthentcationCode}
                />
              </>
            ) : ( */}
          <Route path="/" exact component={login} />
          <Route path="/signup" exact component={Dashboard} />
          <React.Fragment>
            <HeaderNav
              collapsed={collapsed}
              toggleSider={() => setCollapsed(!collapsed)}
            />
            <SiderComponet
              collapsed={collapsed}
              loadLoadDataPage={loadLoadDataPage}
            >
              <Content className="content">
                <Route path="/view" exact component={DataModels} />
                <Route path="/products" exact component={Products} />
                <Route path="/orders" exact component={orders} />
                <Route path="/profile" exact component={profile} />
                <Route path="/licence" exact component={LicencePage} />
                <Route path="/connections" exact component={ConnectionsPage} />
                <Route
                  path="/user-management"
                  exact
                  component={UserManagement}
                />
                <Route
                  path="/user-management-batch"
                  exact
                  component={UserManagementBatch}
                />
                <Route path="/model-build" exact component={ModelBuild} />

                <Route path="/load-data" exact component={LoadData} />
                <Route
                  path="/data-dictionary"
                  exact
                  component={DataDictionaryPage}
                />

                <Route path="/models" exact component={ModelsPage} />
                <Route path="/model-setup" exact component={ModelSetup} />
                <Route
                  path="/manage-analyties"
                  exact
                  component={ManageAnalyties}
                />
                <Route path="/manage-videos" exact component={ManageVideos} />
                <Route path="/data" exact component={DataPage} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/build-model" exact component={BuildModel} />
                <Route path="/sys-params" exact component={SystemParamter} />

                <Route
                  path="/jupyter-notebook"
                  exact
                  component={JupyterNotebook}
                />
                {configData.length > 0 &&
                  configData.map((modelData, index) => (
                    <Route
                      key={index}
                      path={`${"/"}${modelData.ModelName.toLowerCase().replace(
                        /\s/g,
                        ""
                      )}`}
                      exact
                      component={ModelBuild}
                    />
                  ))}
              </Content>
            </SiderComponet>
          </React.Fragment>
          )
          {/* ) : (
            isLoginSuccess &&
            typeof firstTimeLogin !== "undefined" &&
            !firstTimeLogin && <DashboardJSX />
          )} */}
        </Switch>
        {/* <React.Fragment>
          {isLoginSuccess &&
            typeof firstTimeLogin !== "undefined" &&
            firstTimeLogin && (
              <Route path="/create-account" exact component={CreateAccount} />
            )}
        </React.Fragment> */}
      </ErrorBoundary>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  configData: state.mainViewState.configData,
  firstTimeLogin: state.mainViewState.firstTimeLogin,
  userData: state.mainViewState.userData,
});

const mapDispatchToProps = (dispatch) => ({
  setUserModelBuilds: (payload) => dispatch(setUserModelBuildsAction(payload)),
  resetLoadData: (payload) => dispatch(resetLoadDataAction(payload)),
  loadPipelineSelectionData: (payload) =>
    dispatch(loadPipelineSelectionDataAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
