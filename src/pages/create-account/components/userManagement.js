import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { setCreateAccountStageAction } from "../actions/createAccount-action";
import "./userManagement.scss";
import { connect } from "react-redux";
import { validatePassword } from "../../../utils/utils";
import { updateUserApi } from "../../user-management/services/services";

const FormItem = Form.Item;

const UserManagement = ({
  loadNextStage,
  userData,
  createAccountStage,
  updateUser,
  userDataUpdateState,
}) => {
  const [form] = Form.useForm();
  const { Email, FirstName, LastName } = userData;
  const [activeButton, setActiveButton] = useState(null);
  // const [statusButton, setStatusButton] = useState(true);
  const [changeFields, setChangeFields] = useState(false);
  const [firstName, setFirstName] = useState(FirstName);
  const [lastName, setLastName] = useState(LastName);
  const [email, setEmail] = useState(Email);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isValidPasswordState, setIsValidPasswordState] = useState(false);
  const [passwordValidtionStates, setPasswordValidtionStates] = useState({
    upperCase: true,
    number: true,
    specialCharacter: true,
    minLength: true,
  });

  useEffect(() => {
    if (userDataUpdateState === "success") {
      loadNextStage();
    }
  }, [loadNextStage, userDataUpdateState]);

  useEffect(() => {
    createAccountStage(1);
    if (Email && FirstName && LastName) {
      setActiveButton(true);
      setIsValidPasswordState(true);
    }
  }, [Email, FirstName, LastName, createAccountStage]);

  const handleSubmit = (data) => {
    if (activeButton) {
      handleClickCallService(data);
    }
  };

  const handleClickCallService = async (data) => {
    const { UserID } = userData;
    if (activeButton) {
      if (changeFields) {
        const response = await updateUserApi({ ...data, UserID: UserID });
        if (response.data.message === "success") {
          loadNextStage();
        }
      } else {
        loadNextStage();
      }
    }
  };

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
        setChangeFields(true);
        setActiveButton(true);
      } else {
        setActiveButton(false);
      }
    } else {
      setActiveButton(false);
    }
  };

  return (
    <div className="container-wrapper">
      <h2 className="title">Your details</h2>
      <Form
        ref={form}
        onFinish={handleSubmit}
        onFieldsChange={onFieldsChange}
        className="connection-form"
        layout="vertical"
      >
        <Row justify="center">
          <Col span={6} className="row-column">
            <p className="paragraph-content">Tell us more about yourself</p>
            <FormItem
              className="connection-input-item"
              name="firstname"
              label="First Name*"
              initialValue={FirstName}
            >
              <Input
                className="connection-input block-container-item"
                defaultValue={FirstName}
              />
            </FormItem>

            <FormItem
              className="connection-input-item"
              name="lastname"
              label="Last Name*"
              initialValue={LastName}
            >
              <Input
                className="connection-input block-container-item"
                defaultValue={LastName}
              />
            </FormItem>
            <FormItem
              className="connection-input-item"
              name="email"
              label="Email*"
              initialValue={Email}
            >
              <Input
                className="connection-input block-container-item"
                type="email"
                defaultValue={Email}
                disabled={"disabled"}
              />
            </FormItem>
          </Col>
          <Col span={6} className="row-column">
            <p className="paragraph-content">Change your password</p>
            <FormItem
              className="connection-input-item"
              name="password"
              label="Password*"
            >
              <Input.Password className="connection-input" type="password" />
            </FormItem>
            <Row className="password-content">
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
            </Row>
            <Row className="password-content">
              <Col span={12}>
                <p
                  className={
                    passwordValidtionStates["specialCharacter"]
                      ? "password-rules"
                      : "password-rules error"
                  }
                >
                  - One special character
                </p>
              </Col>
              <Col span={12}>
                <p
                  className={
                    passwordValidtionStates["minLength"]
                      ? "password-rules"
                      : "password-rules error"
                  }
                >
                  - 8 characters minimum
                </p>
              </Col>
            </Row>

            <FormItem
              className="connection-input-item"
              name="cpassword"
              label="Repeat Password*"
            >
              <Input.Password className="connection-input" type="password" />
            </FormItem>
          </Col>
        </Row>

        <FormItem
          shouldUpdate={true}
          className="login-action-item"
          valuePropName="checked"
        >
          <Button
            type="primary"
            htmlType="submit"
            className={
              !activeButton ? "form-submit-button" : "form-submit-button active"
            }
            disabled={!activeButton ? "disabled" : ""}
          >
            Next
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  userDataUpdateState: state.mainViewState.userDataUpdateState,
});

const mapDispatchToProps = (dispatch) => ({
  createAccountStage: (payload) =>
    dispatch(setCreateAccountStageAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
