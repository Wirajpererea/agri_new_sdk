import React from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./Buttons.scss";

const CancelButton = ({ onCancelClick, cancelConfirm, confirmMessage }) => {
  return (
    <div className="cancel-button-container">
      <Button
        type="primary"
        shape="round"
        icon={<CloseOutlined />}
        size={"default"}
        danger
        onClick={e =>
          cancelConfirm({
            message: confirmMessage,
            callback: onCancelClick,
            state: false,
            event: e
          })
        }
      >
        Cancel
      </Button>
    </div>
  );
};

export default CancelButton;
