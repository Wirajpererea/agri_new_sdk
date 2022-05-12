import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import "./connections.scss";
import { Card, Status, MessageAlert } from "../../components";
import {
  updateConnectionAction,
  resetConnectionAction,
} from "../login/actions/login-action";
import CryptoJS from "crypto-js";

const FormItem = Form.Item;

const Connections = ({
  connectionDetails,
  userData,
  updateConnections,
  connectionDataUpdateState,
  resetConnectionsStatus,
}) => {
  const [form] = Form.useForm();
  const {
    DatabaseName,
    DatabaseUserPassword,
    DatabaseServerName,
    DatabaseUserName,
    SMTPPort,
    SMTPServerName,
    SMTPUserName,
    SMTPPassword,
  } = connectionDetails;
  const [activeButton, setActiveButton] = useState(false);
  const [statusButton, setStatusButton] = useState(false);

  const [server, setServer] = useState(DatabaseServerName);
  const [db, setDb] = useState(DatabaseName);
  const [username, setUsername] = useState(DatabaseUserName);
  const [password, setPassword] = useState(DatabaseUserPassword);
  const [smtpUrl, setSmtpUrl] = useState(SMTPServerName);
  const [smtpUsername, setSmtpUsername] = useState(SMTPUserName);
  const [smtpPassword, setSmtpPassword] = useState(SMTPPassword);
  const [smtpPort, setSmtpPort] = useState(SMTPPort);
  const [isPageIsDirty, setIsPageIsDirty] = useState(false);
  //This is message status result as boolean
  const [statusResult, setStatusResult] = useState(true);
  const [statusMessageAlert, setStatusMessageAlert] = useState(null);

  const initialValues = {
    server: DatabaseServerName,
    database: DatabaseName,
    username: DatabaseUserName,
    password: DatabaseUserPassword,
    smtpUrl: SMTPServerName,
    smtpUsername: SMTPUserName,
    smtpPassword: SMTPPassword,
    smtpPort: SMTPPort,
  };

  useEffect(() => {
    return () => {
      resetConnectionsStatus();
    };
  }, [resetConnectionsStatus]);

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    const formDataFieldValue = values.length > 0 && values[0]["value"];
    if (formDataField === "server") {
      setServer(formDataFieldValue);
      setActiveButton(true);
    }
    if (formDataField === "database") {
      setDb(formDataFieldValue);
      setActiveButton(true);
    }
    if (formDataField === "username") {
      setUsername(formDataFieldValue);
      setActiveButton(true);
    }
    if (formDataField === "password") {
      setPassword(formDataFieldValue);
      setActiveButton(true);
    }

    if (formDataField === "smtpUrl") {
      setSmtpUrl(formDataFieldValue);
      setActiveButton(true);
    }

    if (formDataField === "smtpUsername") {
      setSmtpUsername(formDataFieldValue);
    }

    if (formDataField === "smtpPassword") {
      setSmtpPassword(formDataFieldValue);
    }

    if (formDataField === "smtpPort") {
      setSmtpPort(formDataFieldValue);
    }

    if (
      server &&
      db &&
      username &&
      password &&
      smtpUrl &&
      smtpUsername &&
      smtpPassword &&
      smtpPort
    ) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  };

  const handleConnection = (values) => {
    const { UserID } = userData;
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(values), 'my-secret-key@123').toString();
    let userdetailsNeeded = {
      userdetails:ciphertext
    }
   
    
    if (activeButton) {
      updateConnections({ ...userdetailsNeeded, UserID: UserID });
    }
  };

  return (
    <div>
      <Card style={{ width: "85%" }} customClass="connections-card page-section">
        <Form
          ref={form}
          onFinish={handleConnection}
          onFieldsChange={onFieldsChange}
          className="connection-form"
          layout="vertical"
          initialValues={initialValues}
        >
          <Row>
            <Col span={12}>
              <h2 className="title">Database</h2>
              <FormItem
                className="connection-input-item"
                name="server"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Server"
              >
                <Input className="connection-input block-container-item" />
              </FormItem>
              <FormItem
                className="connection-input-item"
                name="database"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Database"
              >
                <Input className="connection-input block-container-item" />
              </FormItem>
              <FormItem
                className="connection-input-item"
                name="username"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Username"
              >
                <Input className="connection-input block-container-item" />
              </FormItem>
              <FormItem
                className="connection-input-item"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Password"
              >
                <Input
                  className="connection-input"
                  //iconRender=""

                  type="password"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <h2 className="title">SMTP</h2>
              <FormItem
                className="connection-input-item"
                name="smtpUrl"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="SMTP url"
              >
                <Input className="connection-input block-container-item" />
              </FormItem>
              <FormItem
                className="connection-input-item"
                name="smtpPort"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="SMTP Port"
              >
                <Input className="connection-input block-container-item" />
              </FormItem>
              <FormItem
                className="connection-input-item"
                name="smtpUsername"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="SMTP Username"
              >
                <Input className="connection-input block-container-item" />
              </FormItem>
              <FormItem
                className="connection-input-item"
                name="smtpPassword"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="SMTP Password"
              >
                <Input type="password" className="connection-input" />
              </FormItem>
            </Col>
          </Row>

          <FormItem shouldUpdate={true} className="connection-action-item">
            {connectionDataUpdateState === "success" && (
              <MessageAlert
                message={`Connection details updated successfully`}
                type={"success"}
                customClass="success-msg"
              />
            )}
            {connectionDataUpdateState === "error" && (
              <MessageAlert
                message={`Connection details update failed`}
                type={"error"}
                customClass="error-msg"
              />
            )}
            <Button
              type="primary"
              htmlType="submit"
              className={
                !activeButton ? "form-button-test" : "form-button-test active"
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
  connectionDataUpdateState: state.mainViewState.connectionDataUpdateState,
  connectionDetails: state.mainViewState.connectionData,
  userData: state.mainViewState.userData,
});

const mapDispatchToProps = (dispatch) => ({
  updateConnections: (payload) => dispatch(updateConnectionAction(payload)),
  resetConnectionsStatus: () => dispatch(resetConnectionAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
