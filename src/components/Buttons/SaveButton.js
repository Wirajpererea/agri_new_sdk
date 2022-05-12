import React from "react";
import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import "./Buttons.scss";

const SaveButton = ({ dataSaving }) => {
  return (
    <div className="save-button-container">
      <Button
        type="primary"
        shape="round"
        icon={<SaveOutlined />}
        size={"default"}
        htmlType="submit"
        disabled={dataSaving ? "disabled" : ""}
      >
        {dataSaving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};

export default SaveButton;
