import React, { useEffect, useState } from 'react';
import style from "./FilteringTransactions.module.scss";
import DatePickerComponent from '../DatePicker';
import { useLocation } from 'react-router-dom';

function FilteringTransactions({ fetchByTimeCriteria }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const search = useLocation();


    const formatDate = (date) => {
        const pad = (num) => num.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());

        return `${year}-${month}-${day}T${hours}-${minutes}-00`;
    };

    const setParams = async (dateType, date) => {
        const params = new URLSearchParams(window.location.search);

        if (dateType === 'startDate') {
            params.set('startDate', formatDate(date));
            await fetchByTimeCriteria(startDate)
        } else if (dateType === 'endDate' && params.has('startDate')) {
            params.set('endDate', formatDate(date));
        }

        window.history.replaceState(null, "", `/transactions/filterByDateTimeRange?${params.toString()}`);
    };



    return (
        <section className={style.wrapper}>
            <DatePickerComponent value={startDate} setValue={setStartDate} dateType="startDate" setParams={setParams} />
            <DatePickerComponent value={endDate} setValue={setEndDate} dateType="endDate" setParams={setParams} />
        </section>
    );
}

export default FilteringTransactions;
