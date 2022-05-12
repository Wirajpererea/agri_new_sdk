import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { setCreateAccountStageAction } from "../actions/createAccount-action";
import "./connections.scss";
import { connect } from "react-redux";
import { updateConnectionAction } from "../../login/actions/login-action";

const FormItem = Form.Item;

const Connections = ({
  loadNextStage,
  createAccountStage,
  connectionDetails,
  updateConnections,
  connectionDataUpdateState,
  userData,
}) => {
  const [form] = Form.useForm();
  const {
    DatabaseName,
    DatabaseUserPassword,
    DatabaseServerName,
    DatabaseUserName,
  } = connectionDetails;
  const [activeButton, setActiveButton] = useState(false);
  const [statusButton, setStatusButton] = useState(false);
  const [server, setServer] = useState(DatabaseServerName);
  const [db, setDb] = useState(DatabaseName);
  const [username, setUsername] = useState(DatabaseUserName);
  const [password, setPassword] = useState(DatabaseUserPassword);
  //This is message status result as boolean
  const [statusResult, setStatusResult] = useState(true);
  const [statusMessageAlert, setStatusMessageAlert] = useState(null);

  const initialValues = {
    server: DatabaseServerName,
    database: DatabaseName,
    username: DatabaseUserName,
    password: DatabaseUserPassword,
  };

  useEffect(() => {
    createAccountStage(2);
    if (
      DatabaseName &&
      DatabaseUserPassword &&
      DatabaseServerName &&
      DatabaseUserName
    ) {
      setActiveButton(true);
    }
  }, [
    DatabaseName,
    DatabaseServerName,
    DatabaseUserName,
    DatabaseUserPassword,
    createAccountStage,
  ]);

  const handleSubmit = (data) => {
    setStatusButton(true);
    if (activeButton) {
      loadNextStage();
    }
  };

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    const formDataFieldValue = values.length > 0 && values[0]["value"];

    if (formDataField === "server") {
      setServer(formDataFieldValue);
      setStatusButton(false);
    }
    if (formDataField === "databaseName") {
      setDb(formDataFieldValue);
      setStatusButton(false);
    }
    if (formDataField === "username") {
      setUsername(formDataFieldValue);
      setStatusButton(false);
    }
    if (formDataField === "password") {
      setPassword(formDataFieldValue);
      setStatusButton(false);
    }

    if (server && db && username && password) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  };

  return (
    <div className="container-wrapper">
      <h2 className="title">Your connection</h2>
      <p className="paragraph-content">Connect to data base</p>
      <Form
        ref={form}
        onFinish={handleSubmit}
        onFieldsChange={onFieldsChange}
        className="connection-form"
        layout="vertical"
        initialValues={initialValues}
      >
        <Row justify="center">
          <Col span={6} className="row-column">
            <FormItem
              className="connection-input-item"
              name="server"
              label="Server*"
            >
              <Input
                className="connection-input block-container-item"
                disabled={"disabled"}
              />
            </FormItem>

            <FormItem
              className="connection-input-item"
              name="database"
              label="Database name*"
            >
              <Input
                className="connection-input block-container-item"
                disabled={"disabled"}
              />
            </FormItem>
          </Col>
          <Col span={6} className="row-column">
            <FormItem
              className="connection-input-item"
              name="username"
              label="Username*"
            >
              <Input
                className="connection-input block-container-item"
                disabled={"disabled"}
              />
            </FormItem>
            <FormItem
              className="connection-input-item"
              name="password"
              label="Password*"
            >
              <Input.Password
                className="connection-input"
                type="password"
                disabled={"disabled"}
              />
            </FormItem>
          </Col>
        </Row>

        <FormItem shouldUpdate={true} className="login-action-item">
          <Button
            type="primary"
            htmlType="submit"
            className={
              !activeButton ? "form-button-test" : "form-button-test active"
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
  connectionDetails: state.mainViewState.connectionData,
  connectionDataUpdateState: state.mainViewState.connectionDataUpdateState,
});

const mapDispatchToProps = (dispatch) => ({
  createAccountStage: (payload) =>
    dispatch(setCreateAccountStageAction(payload)),
  updateConnections: (payload) => dispatch(updateConnectionAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
