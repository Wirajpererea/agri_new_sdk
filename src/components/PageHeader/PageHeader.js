import React from "react";
import "./PageHeader.scss";
import { CreateButton } from "../index";

const PageHeader = ({ headerName, onAddClick, addModeActive }) => {
  return (
    <div className="page-header">
      <h3>{headerName}</h3>
      <CreateButton addModeActive={addModeActive} onAddClick={onAddClick} />
    </div>
  );
};

export default PageHeader;
