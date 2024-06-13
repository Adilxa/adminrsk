import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.module.scss";

function DatePickerComponent({ value, setValue, dateType, setParams }) {
    const handleDateChange = (date) => {
        const selectedYear = date ? new Date(date).getFullYear() : null;
        if (selectedYear && selectedYear > 2000) {
            setValue(date);
            setParams(dateType, date);
        } else {
            setValue(null);
            setParams(dateType, null);
        }
    };

    return (
        <DatePicker
            selected={value ? new Date(value) : null}
            showIcon
            onChange={(date) => handleDateChange(date)}
            timeInputLabel="Choose the time:"
            dateFormat="MM/dd/yyyy"
        />
    );
}

export default DatePickerComponent;
