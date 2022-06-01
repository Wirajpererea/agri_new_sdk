import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker
} from "antd";
import { connect } from "react-redux";
import "./dashboardPage.scss";

import { Card, MessageAlert } from "../../components";
import { validatePassword } from "../../utils/utils";
import {
  updateUserDataAction,
  resetUserDataAction,
} from "../login/actions/login-action";
import { registerUser } from "./services/dashboardService";
import moment from "moment";

const FormItem = Form.Item;
const { Option } = Select;

const Dashboard = ({
  userData,
  userDataUpdateState,
  userDataUpdateStateBody,
  resetUserDataStatus,
}) => {
  const { Email, FirstName, LastName, Status } = userData;
  const [form] = Form.useForm();
  const [activeButton, setActiveButton] = useState(null);
  // const [statusButton, setStatusButton] = useState(true);
  const [firstName, setFirstName] = useState(FirstName);
  const [lastName, setLastName] = useState(LastName);
  const [email, setEmail] = useState(Email);
  const [userType, setUserType] = useState();
  const [agreed, setAgreed] = useState(false);
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
    console.log("data===>", data);
    //   [name]
    //  ,[nic]
    // ,[email]
    //  ,[address]
    //  ,[dateOfBirth]
    //  ,[type]
    //  ,[contactNumber]
    //  ,[profilePicPath]
    //  ,[password]
    //  ,[status]
    //  ,[recorded_by]
    //  ,[recorded_date]
    let user = {
      ...data,
      dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
    };
    console.log("user==>", user);
    const regUser = await registerUser(user);
    console.log("usregUserer==>", regUser);
  };
  const selectionChange = (val) => {
    setUserType(val);
  };
  const termsAndConditionsChange = (e) => {
    setAgreed(e.target.checked);
  };
  return (
    <div className="signup-content">
      <Row>
        <Col span={4} />
        <Col span={16}>
          <Card
            style={{ width: "90%" }}
            customClass="user-management-card page-section"
          >
            <h2 className="title">Sign Up</h2>
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
                    Name
                  </label>
                  <FormItem
                    className="connection-input-item"
                    name="name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input className="connection-input block-container-item" />
                  </FormItem>
                  {/* <label className="connection-input-label block-container-item">
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
                  </FormItem> */}
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
                  <label className="connection-input-label block-container-item">
                    Date of Birth
                  </label>
                  <FormItem
                    className="connection-input-item"
                    name="dateOfBirth"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker
                      className="connection-input block-container-item"
                      type="dateOfBirth"
                    />
                  </FormItem>
                  <label className="connection-input-label block-container-item">
                    Contact Number
                  </label>
                  <FormItem
                    className="connection-input-item"
                    name="contact"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      className="connection-input block-container-item"
                      type="contact"
                    />
                  </FormItem>
                  <label className="connection-input-label block-container-item">
                    Address
                  </label>
                  <FormItem
                    className="connection-input-item"
                    name="address"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      className="connection-input block-container-item"
                      type="address"
                    />
                  </FormItem>
                  <label className="connection-input-label block-container-item">
                    NIC
                  </label>
                  <FormItem
                    className="connection-input-item"
                    name="nic"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      className="connection-input block-container-item"
                      type="nic"
                    />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <label className="connection-input-label block-container-item">
                    Type
                  </label>
                  <FormItem
                    className="connection-input-item password-field"
                    name="type"
                  >
                    <Select
                      style={{ width: "200px" }}
                      onChange={(e) => selectionChange(e)}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Option value="seller">Seller</Option>
                      <Option value="consumer">Consumer</Option>
                      <Option value="transporter">Transporter</Option>
                    </Select>
                  </FormItem>
                  <br />
                  {userType === "transporter" && (
                    <>
                      <label className="connection-input-label block-container-item">
                        Vehicle Number
                      </label>
                      <FormItem
                        className="connection-input-item password-field"
                        name="vehicleNumber"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          className="connection-input block-container-item"
                          type="vehicleNumber"
                        />
                      </FormItem>
                      <br />
                      <label className="connection-input-label block-container-item">
                        Vehicle Type
                      </label>
                      <FormItem
                        className="connection-input-item password-field"
                        name="vehicleType"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select style={{ width: "200px" }}>
                          <Option value="lorry">Lorry</Option>
                          <Option value="mini-lorry">Mini-Lorry</Option>
                          <Option value="truck">Truck</Option>
                          <Option value="container">Container</Option>
                        </Select>
                      </FormItem>
                    </>
                  )}
                  <br />
                  <label className="connection-input-label block-container-item">
                    New Password
                  </label>
                  <FormItem
                    className="connection-input-item password-field"
                    name="password"
                  >
                    <Input.Password
                      className="connection-input"
                      type="password"
                    />
                  </FormItem>
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
                    <Input.Password
                      className="connection-input"
                      type="password"
                    />
                  </Form.Item>

                  <Form.Item
                    name="termsAndConditions"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <input
                      type="checkbox"
                      onChange={termsAndConditionsChange}
                      checked={agreed}
                    />
                    &nbsp;
                    I have read and agreed to{" "}
                    <a href="#">
                      terms and conditions.
                    </a>
                  </Form.Item>
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
                  Register
                </Button>
              </FormItem>
            </Form>
          </Card>
        </Col>
        <Col span={4} />
        {/* <Col span={8}>
        <img style={{width:"100%",height:"80%"}} alt="" className="profile-img" src={UserImgIcon} />
        </Col> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
