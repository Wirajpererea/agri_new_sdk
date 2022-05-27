import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { Card } from "../../components";
import {
  updateUserDataAction,
  resetUserDataAction,
} from "../login/actions/login-action";

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem("userData"));
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
              <Col>{user?.name}</Col>
            </Row>
            <Row>
              <Col span={8}>Email </Col>
              <Col span={1}>:</Col>
              <Col>{user?.email}</Col>
            </Row>
            <Row>
              <Col span={8}>Type </Col>
              <Col span={1}>:</Col>
              <Col>{user?.type}</Col>
            </Row>
            <Row>
              <Col span={8}>Status </Col>
              <Col span={1}>:</Col>
              <Col>{user?.status}</Col>
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
