import React, { useEffect, useState } from 'react';
import style from "./FilteringTransactions.module.scss";
import DatePickerComponent from '../DatePicker';
import ComboBox from '../ComboBox';
import { statusCombobox } from '../../constants/filterTransactions.data';

function FilteringTransactions({ fetchByTimeCriteria, fetchByStatus, fetchTransactionsData }) {
    const params = new URLSearchParams(window.location.search);

    const [startDate, setStartDate] = useState(params.get("startDate"));
    const [endDate, setEndDate] = useState(params.get("endDate"));
    const [status, setStatus] = useState(params.get("status"));

    const formatDate = (date) => {
        const pad = (num) => num.toString().padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        return `${year}-${month}-${day}`;
    };

    const setParams = async (dateType, date) => {
        const params = new URLSearchParams(window.location.search);

        if (dateType === 'startDate' && date) {
            params.set('startDate', formatDate(date));
        } else if (dateType === 'endDate' && date && params.has('startDate')) {
            params.set('endDate', formatDate(date));
        } else if (dateType === 'startDate' && !date) {
            params.delete('startDate');
        } else if (dateType === 'endDate' && !date) {
            params.delete('endDate');
        }

        window.history.replaceState(null, "", `/transactions?${params.toString()}`);
        await fetchByTimeCriteria(params.get('startDate'), params.get('endDate'), params.get('status'));
    };

    const startParams = params.get('startDate');
    const endParams = params.get('endDate');
    const statusParams = params.get('status');

    const fetch = async () => {
        if (startParams) {
            await fetchByTimeCriteria(startParams, endParams);
        } else if (startParams && endParams) {
            await fetchByTimeCriteria(startParams, endParams);
        }
        else if (statusParams) {
            await fetchByStatus(statusParams);
        } else {
            await fetchTransactionsData();
        }
    };

    console.log(startDate, " ----- -- -");

    useEffect(() => {
        fetch();
    }, [startDate, endDate, status, startParams]);

    return (
        <section className={style.wrapper}>
            <DatePickerComponent value={startDate} setValue={setStartDate} dateType="startDate" setParams={setParams} />
            <div className={style.gap}></div>
            <DatePickerComponent value={endDate} setValue={setEndDate} dateType="endDate" setParams={setParams} />
            <div className={style.gap}></div>
            <ComboBox options={statusCombobox} setStatus={setStatus} />
        </section>
    );
}

export default FilteringTransactions;
