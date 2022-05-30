import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Status } from "../../../components";
import NumberFormat from "react-number-format";
import { setCreateAccountStageAction } from "../actions/createAccount-action";
import { validateLicenceKey } from "../services/services";
import { connect } from "react-redux";

import "./licence.scss";

const FormItem = Form.Item;

const Licence = ({ loadNextStage, userData, createAccountStage }) => {
  const [form] = Form.useForm();
  const [activeButton, setActiveButton] = useState(false);
  const [statusButton, setStatusButton] = useState(false);
  const [licenceKey, setLicenceKey] = useState(null);
  //This is message status result as boolean
  const [statusResult, setStatusResult] = useState(false);
  //This is message status result as message
  const [licenceStatusMessage, setLicenceStatusMessage] = useState(null);
  const [organisationState, setOrganizationState] = useState(null);

  useEffect(() => {
    createAccountStage(0);
  }, [createAccountStage]);

  const handleClickCallService = async (data) => {
    const { UserID } = userData;
    if (activeButton) {
      try {
        await validateLicenceKey({
          ...data,
          userId: UserID,
        });
        // let licenseKeyValidatingDetails = {
        //     ...data,
        //     userId: UserID,
        // }
        // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(licenseKeyValidatingDetails), 'my-secret-key@123').toString();
        // await validateLicenceKey({licenseDetails: ciphertext});
        setLicenceStatusMessage("Successful validation");
        setStatusResult(true);
        loadNextStage();
      } catch (error) {
        setStatusButton(true);
        setStatusResult(false);
        setLicenceStatusMessage("Invalid licence key. Please try again");
      }
    }
  };

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    const formDataFieldValue = values.length > 0 && values[0]["value"];
    if (formDataField === "licencekey") {
      setLicenceKey(formDataFieldValue);
      setStatusButton(false);
    }
    if (formDataField === "organisation") {
      setOrganizationState(formDataFieldValue);
      setStatusButton(false);
    }
    if (licenceKey && organisationState) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  };
  const handleLicence = (value) => {
    const licanceData = value;
    handleClickCallService(licanceData);
  };

  return (
    <div className="container-wrapper">
      <h2 className="licence-title">Add your licence</h2>
      <p className="paragraph-content">
        Please paste all the details from your onboarding email
      </p>
      <Form
        ref={form}
        onFinish={handleLicence}
        onFieldsChange={onFieldsChange}
        className="licence-form"
        layout="vertical"
      >
        <FormItem
          className="licence-input-item"
          name="organisation"
          label="Organisation"
        >
          <Input className="licence-input" type="text" />
        </FormItem>
        <FormItem
          className="licence-input-item"
          name="licencekey"
          label="key"
          rules={[
            {
              type: "regexp",
              pattern:
                "/A[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}z/",
              message: "Type is wrong",
            },
          ]}
        >
          <NumberFormat
            className="licence-input"
            placeholder="0000-0000-0000-0000-0000"
            customInput={Input}
            format="####-####-####-####-####"
          />
        </FormItem>

        <FormItem
          shouldUpdate={true}
          className="licence-validate-item"
          valuePropName="checked"
        >
          {statusButton ? (
            <Status
              style={{ display: "none", margin: 100, width: 300 }}
              result={statusResult}
              message={licenceStatusMessage}
            />
          ) : (
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
              Next
            </Button>
          )}
        </FormItem>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  createAccountStage: (payload) =>
    dispatch(setCreateAccountStageAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Licence);
