import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './SearchTableInput.scss';

const SearchTableInput = ({ value, loadSearchData }) => {
  return (
    <Input
      className="table-search"
      placeholder="Search"
      value={value}
      onChange={loadSearchData}
      prefix={<SearchOutlined />}
    />
  );
};

export default SearchTableInput;
