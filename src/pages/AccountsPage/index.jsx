import React, { useEffect } from 'react'
import AccountsFiltering from '../../components/AccountsFiltering'
import { useAccounts } from '../../hooks/useAccounts';
import Preloader from '../../components/Preloader';
import AccountsTableList from '../../components/AccountsTableList';
function AccountsPage() {

    const params = new URLSearchParams(window.location.search);
    const statusParams = params.get("status");


    const { accounts, fetchAccounts, isLoading, fetchByStatus, isFilteringLoading } = useAccounts()

    const fetchFiltering = async () => {
        if (statusParams !== null) {
            await fetchByStatus(statusParams)
        }
        else {
            await fetchAccounts()
        }
    }

    useEffect(() => {
        fetchFiltering()
    }, [])

    return (
        <section>
            <AccountsFiltering fetchByStatus={fetchByStatus} fetchAccounts={fetchAccounts} />
            <AccountsTableList accounts={accounts} isFilteringLoading={isFilteringLoading} />
        </section>
    )
}

export default AccountsPage