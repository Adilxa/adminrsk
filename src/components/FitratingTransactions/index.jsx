import React, { useEffect, useState } from 'react';
import style from "./FilteringTransactions.module.scss";
import DatePickerComponent from '../DatePicker';
import ComboBox from '../ComboBox';
import { statusCombobox, typeTransaction } from '../../constants/filterTransactions.data';

function FilteringTransactions({ fetchByTimeCriteria, fetchByStatus, fetchTransactionsData, fetchByType }) {
    const params = new URLSearchParams(window.location.search);

    const [startDate, setStartDate] = useState(params.get("startDate"));
    const [endDate, setEndDate] = useState(params.get("endDate"));
    const [status, setStatus] = useState(params.get("status"));
    const [type, setType] = useState(params.get("type"));

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
            params.delete("status")
        } else if (dateType === 'endDate' && date && params.has('startDate')) {
            params.set('endDate', formatDate(date));
            params.delete("status")
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
    const typeParams = params.get('type');

    const fetch = async () => {
        if (startParams) {
            await fetchByTimeCriteria(startParams, endParams);

        } else if (startParams && endParams) {
            await fetchByTimeCriteria(startParams, endParams);
        }
        else if (statusParams) {
            await fetchByStatus(statusParams);
        } else if (typeParams) {
            await fetchByType(typeParams);
        } else {
            await fetchTransactionsData();
        }
    };


    useEffect(() => {
        fetch();
    }, [startDate, endDate, status, startParams, type, typeParams, endParams, statusParams]);

    return (
        <section className={style.wrapper}>
            <DatePickerComponent value={startDate} setValue={setStartDate} dateType="startDate" setParams={setParams} />
            <div className={style.gap}></div>
            <DatePickerComponent value={endDate} setValue={setEndDate} dateType="endDate" setParams={setParams} />
            <div className={style.gap}></div>
            <ComboBox name={"By status"} statusType="status" options={statusCombobox} setStatus={setStatus} setStartDate={setStartDate} setEndDate={setEndDate} />
            <div className={style.gap}></div>
            <ComboBox name={"By type"} statusType="type" options={typeTransaction} setType={setType} setStatus={setStatus} setStartDate={setStartDate} setEndDate={setEndDate} />
        </section>
    );
}

export default FilteringTransactions;
