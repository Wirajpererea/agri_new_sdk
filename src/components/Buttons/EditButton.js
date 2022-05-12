import React from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./Buttons.scss";

const EditButton = ({ onEditClick }) => {
  return (
    <div className="edit-button-container">
      <Button
        type="primary"
        shape="round"
        icon={<EditOutlined />}
        size={"default"}
        onClick={e => onEditClick(e, true)}
      >
        Edit
      </Button>
    </div>
  );
};

export default EditButton;
