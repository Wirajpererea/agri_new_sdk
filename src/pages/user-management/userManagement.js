import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import "./userManagement.scss";

import { Card, MessageAlert } from "../../components";
import { validatePassword } from "../../utils/utils";
import {
  updateUserDataAction,
  resetUserDataAction,
} from "../login/actions/login-action";

const FormItem = Form.Item;

const UserManagement = ({
  userData,
  updateUser,
  userDataUpdateState,
  userDataUpdateStateBody,
  resetUserDataStatus,
}) => {
  const { Email, FirstName, LastName, Status  } = userData;
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
    // upperCase: true,
    // number: true,
    // specialCharacter: true,
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
      const { validationState, isValidPassword } = validatePassword(
        formDataFieldValue
      );
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

  const handleSubmit = (data) => {
    const { UserID } = userData;
    if (activeButton) {
      let updatedvalues = {
        FirstName:data.firstname,
        LastName:data.lastname,
        Password:data.password,
        InitialPassword :data.currentpassword,
        Email:data.email,
        UserStatus : userStatus
      }
      // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(updatedvalues), 'my-secret-key@123').toString();
      let userdetailsNeeded = {
        userdetails:'',
        UserID: UserID 
      }

      updateUser(userdetailsNeeded);
    }
  };

  return (
    <div>
      <Card style={{ width: "85%" }} customClass="user-management-card page-section">
        <h2 className="title">User Details</h2>
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
                First Name
              </label>
              <FormItem
                className="connection-input-item"
                name="firstname"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input className="connection-input block-container-item" />
              </FormItem>
              <label className="connection-input-label block-container-item">
                Last Name
              </label>
              <FormItem
                className="connection-input-item"
                name="lastname"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input className="connection-input block-container-item" />
              </FormItem>
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
                  disabled={"disabled"}
                />
              </FormItem>
            </Col>
            <Col span={12}>
            <label className="connection-input-label block-container-item">
               Current Password
              </label>
              <FormItem
                className="connection-input-item password-field"
                name="currentpassword"
              >
                <Input.Password className="connection-input" type="password" />
              </FormItem>
              <label className="connection-input-label block-container-item">
                New Password
              </label>
              <FormItem
                className="connection-input-item password-field"
                name="password"
              >
                <Input.Password className="connection-input" type="password" />
              </FormItem>
              <div className="password-rules-text">
                {/* <Row className="password-content">
                  <Col span={12}>
                    <p
                      className={
                        passwordValidtionStates["upperCase"]
                          ? "password-rules"
                          : "password-rules error"
                      }
                    >
                      - One uppercase character
                    </p>
                  </Col>
                  <Col span={12}>
                    <p
                      className={
                        passwordValidtionStates["number"]
                          ? "password-rules"
                          : "password-rules error"
                      }
                    >
                      - One number
                    </p>
                  </Col>
                </Row> */}
                <Row className="password-content">
                  {/* <Col span={12}>
                    <p
                      className={
                        passwordValidtionStates["specialCharacter"]
                          ? "password-rules"
                          : "password-rules error"
                      }
                    >
                      - One special character
                    </p>
                  </Col> */}
                  <Col span={12}>
                    <p
                      className={
                        passwordValidtionStates["minLength"]
                          ? "password-rules"
                          : "password-rules error"
                      }
                    >
                      - 20 characters minimum
                    </p>
                  </Col>
                </Row>
              </div>
              <label className="connection-input-label block-container-item">
                Confirm New Password
              </label>
              <Form.Item
                name="cpassword"
                dependencies={["password"]}
                hasFeedback
                className="connection-input-item"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password className="connection-input" type="password" />
              </Form.Item>
            </Col>
          </Row>

          <FormItem
            shouldUpdate={true}
            className="user-details-action-item"
            valuePropName="checked"
          >
              {userDataUpdateState === "success" && userDataUpdateStateBody[0] != undefined && (
              <MessageAlert
                message={`${userDataUpdateStateBody[0].ErrorMessage}`}
                type={"error"}
                customClass="success-msg"
              />
            )}
            {userDataUpdateState === "success" && userDataUpdateStateBody[0] === undefined && (
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
              className={
                !activeButton
                  ? "form-submit-button"
                  : "form-submit-button active"
              }
              disabled={!activeButton ? "disabled" : ""}
            >
              Save
            </Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  userDataUpdateState: state.mainViewState.userDataUpdateState,
  userDataUpdateStateBody:state.mainViewState.userDataUpdateStateBody
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (payload) => dispatch(updateUserDataAction(payload)),
  resetUserDataStatus: () => dispatch(resetUserDataAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
