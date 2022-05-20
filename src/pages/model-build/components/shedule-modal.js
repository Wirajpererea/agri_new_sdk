import React, { useState } from "react";
import { Modal } from "../../../components";
import { Form, Button, Input, Spin } from "antd";

const FormItem = Form.Item;

const SheduleModal = ({
  modalVisible,
  handleCancel,
  handleBuildNameSave,
  width = 350,
  customClass,
  loading,
}) => {
  const [form] = Form.useForm();
  const [activeButton, setActiveButton] = useState(null);
  const [modalName, setModalNameState] = useState(null);
  const [validModelName, setValidModelName] = useState(false);

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    const formDataFieldValue = values.length > 0 && values[0]["value"];

    if (formDataField === "modalName") {
      if (formDataFieldValue.length < 30) {
        setModalNameState(formDataFieldValue);
        setValidModelName(true);
      } else {
        setValidModelName(false);
      }
    }
    if (modalName && validModelName) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  };

  const buildNameSaveHandler = (dateObj) => {
    const name = dateObj["modalName"];
    handleBuildNameSave(name);
  };

  return (
    <Modal
      customClass={customClass}
      visible={modalVisible}
      onCancel={handleCancel}
      width={width}
    >
      <div className="modal-cantainer">
        <h2 className="modal-title-container">
          How would you like to name your model?
        </h2>
        <Form
          ref={form}
          onFinish={buildNameSaveHandler}
          onFieldsChange={onFieldsChange}
          className="licence-form"
        >
          <label style={{ display: "block" }}>Model’s name</label>
          <FormItem
            className="licence-input-item model-name"
            name="modalName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              className="licence-input"
              style={{
                fontWeight: "normal",
                fontSize: "16px",
                lineHeight: "20px",
                width: "100%",
              }}
            />
          </FormItem>
          {!validModelName && modalName && (
            <span className="error-message-shedule">Maximum 30 characters</span>
          )}
          <React.Fragment>
            {!loading ? (
              <Button
                type="primary"
                htmlType="submit"
                disabled={!activeButton ? "disabled" : ""}
                id="model-name-submit"
                className={
                  !activeButton
                    ? "form-submit-button"
                    : "form-submit-button active"
                }
              >
                Save
              </Button>
            ) : (
              <Spin className="spin-loading" spinning={loading} size="large" />
            )}
          </React.Fragment>
        </Form>
      </div>
    </Modal>
  );
};

export default SheduleModal;
