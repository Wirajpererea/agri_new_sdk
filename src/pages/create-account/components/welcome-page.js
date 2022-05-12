import React from "react";
import { Button, Row, Col } from "antd";
import wrapper_img from "../../../assets/images/common/login-wrapper-02.png";
import "./welcome-page.scss";
import { connect } from "react-redux";
import { firstTimeLoginAction } from "../../login/actions/login-action";

const WelcomePage = (props) => {
  const navigateToDashboard = () => {
    props.setFirstTimeLogin(false);
  };

  return (
    <div className="welcome-page-container">
      <div className="card-component-welcome-page">
        <Row>
          <Col span={8}>
            <div className="left-warp">
              <p className="paragraph-content">
                Well done, your account has been created
              </p>
              <Button
                type="primary"
                className="welcome-button"
                onClick={navigateToDashboard}
              >
                Let’s start
              </Button>
            </div>
          </Col>
          <Col span={16}>
            <div className="details-warp">
              <img alt="log" className="wrapper-img" src={wrapper_img} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setFirstTimeLogin: (payload) => dispatch(firstTimeLoginAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
