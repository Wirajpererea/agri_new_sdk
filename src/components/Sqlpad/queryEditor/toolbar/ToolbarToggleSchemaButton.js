import DatabaseIcon from "mdi-react/DatabaseIcon";
import React from "react";
import IconButton from "../../common/IconButton";

function ToolbarToggleSchemaButton() {
  const toggleSchema = () => {};

  return (
    <IconButton tooltip="Toggle schema" onClick={toggleSchema}>
      <DatabaseIcon />
    </IconButton>
  );
}

export default React.memo(ToolbarToggleSchemaButton);
