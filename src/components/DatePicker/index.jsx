import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.module.scss";

function DatePickerComponent({ value, setValue, dateType, setParams }) {

    const handleDateChange = (date) => {
        setValue(date);
        setParams(dateType, date);
    };

    return (
        <DatePicker
            selected={value}
            showIcon
            onChange={(date) => handleDateChange(date)}
            timeInputLabel="Choose the time:"
            dateFormat="MM/dd/yyyy"
        />
    );
}

export default DatePickerComponent;
