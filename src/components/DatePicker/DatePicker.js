import React from "react";
import { DatePicker } from "antd";
import "./DatePicker.scss";

export const DatePickerComponent = ({ placeholder, type = null, setDate }) => {
  const onChange = (date, dateString) => {
    setDate(date)
  }

  return (
    <div className="date-picker-component">
      <DatePicker onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default DatePickerComponent;
