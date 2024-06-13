import React, { useEffect, useState } from 'react';
import style from "./FilteringTransactions.module.scss";
import DatePickerComponent from '../DatePicker';

function FilteringTransactions({ fetchByTimeCriteria }) {

    const params = new URLSearchParams(window.location.search)


    const [startDate, setStartDate] = useState(params.get("startDate"));
    const [endDate, setEndDate] = useState(params.get("endDate"));


    const formatDate = (date) => {
        const pad = (num) => num.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        // const hours = pad(date.getHours());
        // const minutes = pad(date.getMinutes());

        return `${year}-${month}-${day}`;
    };

    const setParams = async (dateType, date) => {
        const params = new URLSearchParams(window.location.search);

        if (dateType === 'startDate') {
            params.set('startDate', formatDate(date));
        } else if (dateType === 'endDate' && params.has('startDate')) {
            params.set('endDate', formatDate(date));

        }
        window.history.replaceState(null, "", `/transactions/filterByDateTimeRange?${params.toString()}`);
    };


    const startParams = params.get('startDate');
    const endParams = params.get('endDate');

    const fetch = async () => {
        await fetchByTimeCriteria(startParams, endParams)
    }

    useEffect(() => {
        fetch()
    }, [startDate, endDate])

    return (
        <section className={style.wrapper}>
            <DatePickerComponent value={startDate} setValue={setStartDate} dateType="startDate" setParams={setParams} />
            <div className={style.gap}></div>
            <DatePickerComponent value={endDate} setValue={setEndDate} dateType="endDate" setParams={setParams} />
        </section>
    );
}

export default FilteringTransactions;
