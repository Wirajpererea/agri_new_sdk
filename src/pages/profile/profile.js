import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Table,
  Alert,
  notification,
  Upload,
  Modal,
} from "antd";
import { connect } from "react-redux";

import { Card } from "../../components";
import {
  updateUserDataAction,
  resetUserDataAction,
} from "../login/actions/login-action";
// import {
//   addProducts,
//   getProducts,
//   updateProducts,
// } from "./services/profileService";

const Profile = ({ userData }) => {
  const { Email, FirstName, LastName, Status } = userData;

  //   useEffect(() => {
  //     onInitPageLoadOut();
  //   }, []);

  //   const onInitPageLoadOut = async () => {
  //     let data = {
  //       userId: 1,
  //     };
  //   };

  return (
    <div>
      <Row>
        <Col span={2} />
        <Col span={18}>
          <Card
            style={{ width: "90%" }}
            customClass="user-management-card page-section"
          >
            <h2 className="title">Profile</h2>
            <Row>
              <img
                style={{ margin: "auto" }}
                width={"75px"}
                src="https://www.w3schools.com/howto/img_avatar.png"
              />
            </Row>
            <Row>
              <Col span={8}>Name </Col>
              <Col span={1}>:</Col>
              <Col>{`${FirstName} ${LastName}`}</Col>
            </Row>
            <Row>
              <Col span={8}>Email </Col>
              <Col span={1}>:</Col>
              <Col>{Email}</Col>
            </Row>
            <Row>
              <Col span={8}>Status </Col>
              <Col span={1}>:</Col>
              <Col>{Status}</Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  userDataUpdateState: state.mainViewState.userDataUpdateState,
  userDataUpdateStateBody: state.mainViewState.userDataUpdateStateBody,
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (payload) => dispatch(updateUserDataAction(payload)),
  resetUserDataStatus: () => dispatch(resetUserDataAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
