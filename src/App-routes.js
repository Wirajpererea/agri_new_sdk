import React from "react";
import { Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "./components";
import UserManagement from "./pages/user-management/userManagement";
import UserManagementBatch from "./pages/user-management/userManagement-batch";
import Dashboard from "./pages/dashboard/dashboardPage";
import Products from "./pages/products/products";
import LoadData from "./pages/load-data/loadData";
import DataModels from "./pages/data-models/datamodels";
import { connect } from "react-redux";
import { HeaderNav, SiderComponet } from "./components";
import { Layout } from "antd";
import { useHistory } from "react-router-dom";
import { setUserModelBuildsAction } from "./pages/login/actions/login-action";
import {
  resetLoadDataAction,
  loadPipelineSelectionDataAction,
} from "./pages/load-data/actions/loadData-action";
import login from "./pages/login/login";
import orders from "./pages/orders/orders";
import profile from "./pages/profile/profile";
import viewOrders from "./pages/orders/viewOrders";
import addTransport from "./pages/orders/addTransport";

const { Content } = Layout;

const AppRoutes = ({ collapsed, setCollapsed, loadPipelineSelectionData }) => {
  const history = useHistory();

  const loadLoadDataPage = (props) => {
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
                <Route path="/view-orders" exact component={viewOrders} />
                <Route path="/add-transport" exact component={addTransport} />
                <Route
                  path="/view-transport-orders"
                  exact
                  component={profile}
                />
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

                <Route path="/load-data" exact component={LoadData} />
                <Route path="/dashboard" exact component={Dashboard} />
              </Content>
            </SiderComponet>
          </React.Fragment>
          )
        </Switch>
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
