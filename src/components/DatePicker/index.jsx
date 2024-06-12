import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.module.scss";

return (
    <DatePicker
        selected={value}
        showIcon
        onChange={(date) => handleDateChange(date)}
        timeInputLabel="Choose the time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
    />
);

export default DatePickerComponent;
