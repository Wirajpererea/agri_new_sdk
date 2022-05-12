import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./Buttons.scss";

const CreateButton = ({ onAddClick, addModeActive }) => {
  return (
    <div className="create-button-container">
      <Button
        type="primary"
        shape="round"
        icon={<PlusOutlined />}
        size={"default"}
        onClick={e => !addModeActive && onAddClick(e, true)}
        disabled={addModeActive ? "disabled" : false}
      >
        Add
      </Button>
    </div>
  );
};

export default CreateButton;
