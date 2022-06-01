import React from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { PayCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import "./Sider.scss";
import UserImgIcon from "../../assets/icons/user.png";

const { Sider } = Layout;

const SiderComponet = ({ children, collapsed, userData }) => {
  const user = JSON.parse(sessionStorage.getItem("userData"));

  return (
    <Layout className="data-view-with-sider">
      <Sider
        trigger={null}
        className="left-sider"
        collapsible
        collapsed={collapsed}
        width={250}
      >
        <Menu
          theme="dark"
          className="sider-menu"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <li className="nav-main-profile">
            <img
              alt=""
              className="profile-img"
              src={UserImgIcon}
              style={{ marginLeft: "35px" }}
            />
            {userData.FirstName} {userData.LastName}
          </li>
          <Menu.Item
            className="menu-item"
            key="products"
            icon={<PayCircleOutlined />}
          >
            <NavLink exact to={"/profile"}>
              My Profile
            </NavLink>
          </Menu.Item>
          {user?.type === "seller" && (
            <Menu.Item
              className="menu-item"
              key="products"
              icon={<PayCircleOutlined />}
            >
              <NavLink exact to={"/products"}>
                Add Products
              </NavLink>
            </Menu.Item>
          )}
          <Menu.Item
            className="menu-item"
            key="products"
            icon={<PayCircleOutlined />}
          >
            <NavLink exact to={"/view"}>
              View Products
            </NavLink>
          </Menu.Item>
          <Menu.Item
            className="menu-item"
            key="products"
            icon={<PayCircleOutlined />}
          >
            <NavLink exact to={"/view-orders"}>
              View Orders
            </NavLink>
          </Menu.Item>
          {/* <Menu.Item
            className="menu-item"
            key="products"
            icon={<PayCircleOutlined />}
          >
            <NavLink exact to={"/view-transport-orders"}>
              View Transport Orders
            </NavLink>
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">{children}</Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  configData: state.mainViewState.configData,
  executionId: state.modelBuildState.executionData,
  endResult: state.modelBuildState.EndResult,
  modelBuildStartStatus: state.modelBuildState.modelBuildStartStatus,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SiderComponet);
