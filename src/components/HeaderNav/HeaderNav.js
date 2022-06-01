import React from "react";
import { Layout } from "antd";
import "./HeaderNav.scss";
import LogoutIcon from "../../assets/icons/log-out.png";
import { logOutAction } from "../../pages/login/actions/login-action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

const HeaderNav = ({ logout }) => {
  const history = useHistory();
  const userLogOut = () => {
    sessionStorage.removeItem("token");
    logout();
    history.push("/");
  };
  return (
    <React.Fragment>
      <Header className="nav-header">
        <div className="nav-header-content">
          <div className="logo">
            <span
              className="name"
              style={{ fontWeight: "bolder", fontSize: "20px", marginLeft:'90px', width:'100%' }}
            >
              Ease Agri
            </span>
          </div>
          <div className="right-side">
            <ul className="nav navbar-nav navbar-right">
              <li className="logout" onClick={() => userLogOut()}>
                <img src={LogoutIcon} alt="" />
                Log Out
              </li>
            </ul>
          </div>
        </div>
      </Header>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  logout: (payload) => dispatch(logOutAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
