import ConnectedIcon from "mdi-react/ServerNetworkIcon";
import DisconnectedIcon from "mdi-react/ServerNetworkOffIcon";
import React, { useState } from "react";
import useSWR from "swr";
import IconButton from "../../common/IconButton";


function ToolbarConnectionClientButton({
  connectionClient,
  selectedConnectionId,
  connectConnectionClient,
  disconnectConnectionClient,
}) {
  const [fetching, setFetching] = useState(false);

  let { data: connectionsData } = useSWR("/api/connections");
  const connections = connectionsData || [];

  async function handleClick() {
    setFetching(true);
    setFetching(false);
  }

  // If no connections or one isn't selected don't render anything
  if (!connections || connections.length === 0 || !selectedConnectionId) {
    return null;
  }

  const connection = connections.find(
    (connection) => connection.id === selectedConnectionId
  );

  const supportedAndEnabled =
    connection &&
    connection.supportsConnectionClient &&
    connection.multiStatementTransactionEnabled;

  if (!supportedAndEnabled) {
    return null;
  }

  return (
    <IconButton
      onClick={handleClick}
      disabled={fetching}
      tooltip={
        connectionClient ? "Disconnect from database" : "Connect to database"
      }
    >
      {connectionClient ? <ConnectedIcon /> : <DisconnectedIcon />}
    </IconButton>
  );
}

export default ToolbarConnectionClientButton;
