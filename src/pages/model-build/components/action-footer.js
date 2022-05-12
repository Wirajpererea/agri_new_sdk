import React from "react";
import { Button } from "antd";

const ActionFooter = ({
  previousButtonEnable,
  nextButtonEnable,
  loadNextStage,
  currentActive,
  loadPreviousStage,
  handleLogOutput,
  executionId,
}) => {
  return (
    <div className="footer-container">
      {previousButtonEnable && (
        <Button
          type="primary"
          htmlType="submit"
          className={"form-previous-button active"}
          onClick={loadPreviousStage}
        >
          Previous
        </Button>
      )}

      {currentActive !== 4 && !previousButtonEnable && (
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
      {executionId && (
        <Button
          type="primary"
          htmlType="submit"
          className="log-output"
          onClick={handleLogOutput}
        >
          Log Output
        </Button>
      )}
    </div>
  );
};

export default ActionFooter;
