import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Carousel } from "antd";
import { connect } from "react-redux";
import { loginAction } from "./actions/login-action";
import logo from "../../assets/images/common/D&D-Logo.png";
import wrapper_img from "../../assets/images/common/login-wrapper-02.png";
import image1 from "../../assets/images/common/thumbnail_image_1.jpg";
import image2 from "../../assets/images/common/thumbnail_image_2.jpg";
import image3 from "../../assets/images/common/thumbnail_image_3.jpg";
import { MessageAlert } from "../../components";
import "./login.scss";
import CryptoJS from "crypto-js";
import { useHistory } from "react-router-dom";
import { truncate } from "lodash";
import { updateUserIsLoggedApi } from "./services/login-service";
import { setUserDataLogAction } from "../../pages/login/actions/login-action";

const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const FormItem = Form.Item;

const LoginAuthCode = (props) => {
  const [form] = Form.useForm();
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [authenticationCode, setAuthenticationCode] = useState(null);
  const [authCodeValidation, setAuthCodeValidation] = useState(false);
  const [verifiedAuthSecrect, setverifiedAuthSecrect] = useState(null);
  const history = useHistory();

  const secretCodeForAuth = sessionStorage.getItem("secretKey");

  useEffect(() => {
    verifygoogleAuthenticaterCode();
  }, []);

  const verifygoogleAuthenticaterCode = () => {
    const verified = speakeasy.totp.verify({
      secret: secretCodeForAuth,
      encoding: "ascii",
      token: authenticationCode,
    });

    setverifiedAuthSecrect(verified);
    return verified;
  };

  const updateUserIsLogged = async () => {
    const resultAuth = verifygoogleAuthenticaterCode();
    let loggedStatus = {
      userId: props.userData.UserID,
      userLogStatus: resultAuth,
    };

    await updateUserIsLoggedApi(loggedStatus);
  };

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    const formDataFieldValue = values.length > 0 && values[0]["value"];
    if (formDataField === "authenticationCode") {
      setAuthenticationCode(formDataFieldValue);
    }
    if (authenticationCode) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  };

  const authenticationProcessHandleClick = () => {
    updateUserIsLogged();
    const updatedObj = {
      ...props.userData,
      IsLoggedUser: true,
    };
    props.setUserDataLog(updatedObj);
    const result = verifygoogleAuthenticaterCode();
    if (result) {
      history.push("/");
    } else {
      setAuthCodeValidation(true);
    }
  };

  return (
    <div className="login-page-continer">
      <div className="login-warp">
        <div className="header-container">
          <img alt="log" className="header-logo" src={logo} />
        </div>
        <div className="login-form-container">
          <h2 className="welcome">Welcome to your</h2>
          <h2 className="app-name">Ease Agri</h2>
          <Form
            ref={form}
            //onFinish={handleLogin}
            onFieldsChange={onFieldsChange}
            className="login-form"
            layout="vertical"
          >
            <FormItem
              className="login-input-item"
              name="authenticationCode"
              label="Google Authentication Code"
              rules={[
                {
                  required: true,
                  message: "Please input google authentication code",
                },
              ]}
            >
              <Input
                className="login-input"
                placeholder="Google Authentication Code"
              />
            </FormItem>

            <FormItem
              shouldUpdate={true}
              name="remember"
              className="login-action-item"
              valuePropName="checked"
            >
              {authCodeValidation && (
                <MessageAlert
                  message={"invalid code. please try again"}
                  type={"error"}
                />
              )}
              <Button
                type="primary"
                htmlType="submit"
                className={
                  !activeButton
                    ? "login-form-button"
                    : "login-form-button active"
                }
                onClick={authenticationProcessHandleClick}
              >
                Authenticate
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <div className="details-warp">
        {/** <img alt="log" className="wrapper-img" src={image1} />*/}
        <Carousel autoplay>
          <div>
            <img alt="log" className="wrapper-img" src={image1} />
          </div>
          <div>
            <img alt="log" className="wrapper-img" src={image2} />
          </div>
          <div>
            <img alt="log" className="wrapper-img" src={image3} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(loginAction(payload)),
  setUserDataLog: (payload) => dispatch(setUserDataLogAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginAuthCode);
