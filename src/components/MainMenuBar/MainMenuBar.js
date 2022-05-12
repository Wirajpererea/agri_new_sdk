import React from "react";
import { Menu } from "antd";
import "./MainMenuBar.scss";

const MainMenuBar = () => {
  return (
    <Menu
      className="main-menu-bar"
      mode="horizontal"
      defaultSelectedKeys={["units"]}
    >
    </Menu>
  );
};

export default MainMenuBar;
