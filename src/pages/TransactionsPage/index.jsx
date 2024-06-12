import React, { useEffect } from 'react';
import style from "./Transactions.module.scss";
import useTransactions from '../../hooks/useTransactions';
import Preloader from "../../components/Preloader/index"
import TransactionsTableList from '../../components/TransactionsTableList';
import { useLocation, useNavigate } from 'react-router-dom';
import FilteringTransactions from '../../components/FitratingTransactions';

function TransactionsPage() {


    // http://localhost:8000/transactions
    // http://localhost:8000/transactions/filterByDateTimeRange?startDate=2024-06-07T13:00:00&endDate=2024-06-07T13:00:00
    // http://localhost:8000/transactions/filterByStatusID?status=1
    // http://localhost:8000/transactions/filterByTransactionTypeID?type=2
    // http://localhost:8000/transactions/countByTransactionTypeAndStatus/4
    // http://localhost:8000/transactions/countByTransactionStatus/1

    const { transactions, isLoading, fetchTransactionsData, fetchByTimeCriteria } = useTransactions()

    useEffect(() => {
        fetchTransactionsData()
    }, [])

    console.log(transactions);

    if (isLoading) return <Preloader />
    return (
        <section className={style.wrapper}>
            <FilteringTransactions fetchByTimeCriteria={fetchByTimeCriteria} />
            <TransactionsTableList transactionsArray={transactions} />
        </section>
    )
}

export default TransactionsPage