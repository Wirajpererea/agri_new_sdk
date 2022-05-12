import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./Buttons.scss";

const SearchButton = () => {
  return (
    <div className="search-button-container">
      <Button
        type="primary"
        shape="round"
        icon={<SearchOutlined />}
        size={"default"}
        htmlType="submit"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchButton;
