import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import "./login.scss";

import { Card, MessageAlert } from "../../components";
import { validatePassword } from "../../utils/utils";
import {
  updateUserDataAction,
  resetUserDataAction,
} from "../login/actions/login-action";
import { callLoginApi } from "./services/login-service";
import { NavLink, useHistory } from "react-router-dom";

const FormItem = Form.Item;

const Login = ({
  userData,
  updateUser,
  userDataUpdateState,
  userDataUpdateStateBody,
  resetUserDataStatus,
}) => {
  const history = useHistory();

  const { Email, FirstName, LastName, Status } = userData;
  const [form] = Form.useForm();
  const [activeButton, setActiveButton] = useState(null);
  // const [statusButton, setStatusButton] = useState(true);
  const [firstName, setFirstName] = useState(FirstName);
  const [lastName, setLastName] = useState(LastName);
  const [email, setEmail] = useState(Email);
  const [userStatus, setUserStatus] = useState(Status);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isValidPasswordState, setIsValidPasswordState] = useState(false);
  const [passwordValidtionStates, setPasswordValidtionStates] = useState({
    minLength: true,
  });

  const initialValues = {
    firstname: FirstName,
    lastname: LastName,
    email: Email,
  };

  useEffect(() => {
    return () => {
      resetUserDataStatus();
    };
  }, [resetUserDataStatus]);

  useEffect(() => {
    if (Email && FirstName && LastName) {
      setActiveButton(false);
      setIsValidPasswordState(true);
    }
  }, [Email, FirstName, LastName]);

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    const formDataFieldValue = values.length > 0 && values[0]["value"];
    if (formDataField === "firstname") {
      setFirstName(formDataFieldValue);
    }
    if (formDataField === "lastname") {
      setLastName(formDataFieldValue);
    }
    if (formDataField === "email") {
      setEmail(formDataFieldValue);
    }

    if (formDataField === "password") {
      const { validationState, isValidPassword } =
        validatePassword(formDataFieldValue);
      setIsValidPasswordState(isValidPassword);
      setPasswordValidtionStates(validationState);
      setPassword(formDataFieldValue);
    }
    if (formDataField === "cpassword") {
      setCPassword(formDataFieldValue);
    }

    if (firstName && lastName && email && isValidPasswordState) {
      if (password === cPassword) {
        setActiveButton(true);
      } else {
        setActiveButton(false);
      }
    } else {
      setActiveButton(false);
    }
  };

  const handleSubmit = async (data) => {
    const loginResult = await callLoginApi(data);
    console.log("loginResult====>", loginResult);
    if (loginResult.data?.body.status === true) {
      sessionStorage.setItem(
        "userData",
        JSON.stringify(loginResult.data?.body.user)
      );
      history.push("/view");
    }
  };

  return (
    <div className="login-content">
      <Card
        style={{ width: "95%" }}
        customClass="user-management-card page-section"
      >
        <h2 className="title">Login Details</h2>
        <Form
          ref={form}
          onFinish={handleSubmit}
          onFieldsChange={onFieldsChange}
          className="connection-form"
          initialValues={initialValues}
        >
          <Row justify="end">
            <Col span={12}>
              <label className="connection-input-label block-container-item">
                Email
              </label>
              <FormItem
                className="connection-input-item"
                name="email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  className="connection-input block-container-item"
                  type="email"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <label className="connection-input-label block-container-item">
                Password
              </label>
              <FormItem
                className="connection-input-item password-field"
                name="password"
              >
                <Input.Password className="connection-input" type="password" />
              </FormItem>
            </Col>
          </Row>

          <FormItem
            shouldUpdate={true}
            className="user-details-action-item"
            valuePropName="checked"
          >
            {userDataUpdateState === "success" &&
              userDataUpdateStateBody[0] != undefined && (
                <MessageAlert
                  message={`${userDataUpdateStateBody[0].ErrorMessage}`}
                  type={"error"}
                  customClass="success-msg"
                />
              )}
            {userDataUpdateState === "success" &&
              userDataUpdateStateBody[0] === undefined && (
                <MessageAlert
                  message={`User details updated successfully.`}
                  type={"success"}
                  customClass="success-msg"
                />
              )}
            {userDataUpdateState === "error" && (
              <MessageAlert
                message={`User details update failed.`}
                type={"error"}
                customClass="error-msg"
              />
            )}
            <Button
              type="primary"
              htmlType="submit"
              className="form-submit-button active"
            >
              Login
            </Button>
            
            <FormItem style={{marginTop:'20px'}}>
              New to Ease Agri? <NavLink to="/signup">Signup here</NavLink>
            </FormItem>
          </FormItem>
        </Form>
      </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
