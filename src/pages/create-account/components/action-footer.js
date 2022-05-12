import React from "react";
import { Button } from "antd";

const ActionFooter = ({
  previousButtonActive,
  nextButtonEnable,
  loadNextStage,
  currentActive,
  loadPreviousStage,
}) => {
  return (
    <div className="footer-container">
      {currentActive !== 0 && (
        <Button
          type="primary"
          htmlType="submit"
          className={"form-previous-button"}
          onClick={loadPreviousStage}
        >
          Previous
        </Button>
      )}

      {currentActive !== 4 && (
        <Button
          type="primary"
          htmlType="submit"
          className={
            !nextButtonEnable ? "form-next-button" : "form-next-button active"
          }
          disabled={!nextButtonEnable ? "disabled" : ""}
          onClick={loadNextStage}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default ActionFooter;
