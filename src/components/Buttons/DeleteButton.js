import React from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./Buttons.scss";

const DeleteButton = ({ deleteConfirm, onDeleteClick }) => {
  return (
    <div className="delete-button-container">
      <Button
        type="primary"
        shape="round"
        icon={<DeleteOutlined />}
        size={"default"}
        danger
        onClick={e =>
          deleteConfirm({
            message: "Do you Want to delete this?",
            callback: onDeleteClick,
            event: e
          })
        }
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteButton;
