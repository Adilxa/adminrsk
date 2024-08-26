import React, { useEffect } from 'react';
import style from "./Transactions.module.scss";
import useTransactions from '../../hooks/useTransactions';
import Preloader from "../../components/Preloader/index"
import TransactionsTableList from '../../components/TransactionsTableList';
import FilteringTransactions from '../../components/FitratingTransactions';
import ReportButton from '../../components/ReportButton';

function TransactionsPage() {

    const { transactions, isLoading, fetchTransactionsData, fetchByTimeCriteria, fetchByStatus, fetchByType } = useTransactions()

    useEffect(() => {
        fetchTransactionsData()
    }, [])

    if (isLoading) return <Preloader />
    return (
        <section className={style.wrapper}>
            <ReportButton data={transactions} />
            <FilteringTransactions fetchTransactionsData={fetchTransactionsData} fetchByTimeCriteria={fetchByTimeCriteria} fetchByStatus={fetchByStatus} fetchByType={fetchByType} transactions={transactions} />
            <TransactionsTableList transactionsArray={transactions} />
        </section>
    )
}

export default TransactionsPage;