import React, { useState, useEffect } from "react";
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
import sessionStorage from "redux-persist/es/storage/session";

const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const FormItem = Form.Item;

const LoginQRCode = (props) => {
  const [form] = Form.useForm();
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [qrImagePath, setQRImagePath] = useState();
  const history = useHistory();

  useEffect(() => {
    googleAuthenticatorGenerate();
  }, []);

  // To disable submit button at the beginning.

  const handleLogin = (values) => {
    let updatedvalues = {
      userName: values.userName,
      password: password,
    };
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(updatedvalues),
      "my-secret-key@123"
    ).toString();
    let userdetailsNeeded = {
      userdetails: ciphertext,
    };

    if (activeButton) {
      props.login(userdetailsNeeded);
    }
  };

  const googleAuthenticatorGenerate = () => {
    var secret = speakeasy.generateSecret({
      name: "DOS_authentication",
    });

    qrcode.toDataURL(secret.otpauth_url, function (err, data) {
      setQRImagePath(data);
    });
    sessionStorage.setItem("secretKey", secret.ascii);
  };

  const loginbtnClick = () => {
    history.push("/login-auth-code");
  };

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    const formDataFieldValue = values.length > 0 && values[0]["value"];
    if (formDataField === "userName") {
      setUserName(formDataFieldValue);
    }
    if (formDataField === "password") {
      setPassword(formDataFieldValue);
    }

    if (userName && password) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
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
            onFinish={handleLogin}
            onFieldsChange={onFieldsChange}
            className="login-form"
            layout="vertical"
          >
            <div className="QR-auth-code">
              <h3 className="set-up">
                <b>Set Up Authenticator</b>
              </h3>
              <ul className="set-up-list">
                <li>Get the Authenticator App from the Play Store.</li>
                <li>
                  In the App select <b>Set up account.</b>
                </li>
                <li>
                  Choose <b>Scan a barcode.</b>
                </li>
              </ul>
            </div>
            <div className="qr-image-show">
              <img src={qrImagePath}></img>
            </div>

            <FormItem
              shouldUpdate={true}
              name="remember"
              className="login-action-item"
              valuePropName="checked"
            >
              {props.loginError && (
                <MessageAlert
                  message={props.loginError.message}
                  type={"error"}
                />
              )}
              <Button
                type="primary"
                htmlType="submit"
                className="auth-button"
                onClick={loginbtnClick}
              >
                Authenticate
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <div className="details-warp">
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
  isLoginPending: state.mainViewState.isLoginPending,
  isLoginSuccess: state.mainViewState.isLoginSuccess,
  loginError: state.mainViewState.loginError,
  userData: state.mainViewState.userData,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(loginAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginQRCode);
