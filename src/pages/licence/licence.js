import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Card, Status } from "../../components";
import NumberFormat from "react-number-format";

import "./licence.scss";

const FormItem = Form.Item;

const Licence = (props) => {
  const [form] = Form.useForm();
  const [activeButton, setActiveButton] = useState(false);
  const [statusButton, setStatusButton] = useState(false);

  const [licenceKey, setLicenceKey] = useState(null);

  //This is message status result as boolean
  const [statusResult, setStatusResult] = useState(true);

  //This is message status result as message
  const [licenceStatusMessage, setLicenceStatusMessage] = useState(null);

  const handleClick = () => {
    setStatusButton(true);
    if (activeButton) {
      if (statusResult) {
        setLicenceStatusMessage("Successful validation");
      } else {
        setLicenceStatusMessage("Validation failed");
      }
    }
  };

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    const formDataFieldValue = values.length > 0 && values[0]["value"];
    if (formDataField === "licence-key") {
      setLicenceKey(formDataFieldValue);
      setStatusButton(false);
    }
    if (licenceKey) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  };

  return (
    <div>
      <Card style={{ width: 400 }}>
        <h2 className="licence-title">Add your licence</h2>
        <p className="paragraph-content">You will find this in your inbox</p>
        <Form
          ref={form}
          // onFinish={handleLicence}
          onFieldsChange={onFieldsChange}
          className="licence-form"
        >
          <FormItem
            className="licence-input-item"
            name="licence-key"
            rules={[
              {
                required: true,
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
            // name="remember"
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
                onClick={handleClick}
                className={
                  !activeButton
                    ? "connection-form-button-test"
                    : "connection-form-button-test active"
                }
                disabled={!activeButton ? "disabled" : ""}
              >
                Validate
              </Button>
            )}
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default Licence;
