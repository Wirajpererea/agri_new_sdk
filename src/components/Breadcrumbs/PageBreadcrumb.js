import React from 'react';
import { Breadcrumb } from 'antd';
import './PageBreadcrumb.scss';
import { HomeOutlined } from '@ant-design/icons';

const PageBreadcrumb = ({ pageName }) => {
  return (
    <Breadcrumb className="breadcrumb-container" separator=">">
      <Breadcrumb.Item href="" className="breadcrumb-item">
        <HomeOutlined className="home-icon" />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="" className="breadcrumb-item">
        <span className="pageName">{pageName}</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
