import React from 'react'
import style from "./AccountsTable.module.scss";
import "./AccountsTable.module.scss";
function AccountsTableList({ accounts, isFilteringLoading }) {

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Account</th>
                    <th>Balance</th>
                    <th>Currency</th>
                    <th>Status</th>
                    <th>Bank</th>
                </tr>
            </thead>
            {
                accounts?.length ?
                    <tbody>
                        {
                            accounts?.map((el) =>
                                <tr key={el.id}>
                                    <td>{el.id}</td>
                                    <td>{el.numberofschet}</td>
                                    <td>{el.balance}</td>
                                    <td>{el.currency.symbol}</td>
                                    <td>{el.status.statusName}</td>
                                    <td>{el.bank.nameofbanks}</td>
                                </tr>
                            )
                        }
                    </tbody>
                    : !isFilteringLoading ? <div className={style.nonDataWrapper}>
                        <h5>No Data Yet</h5>
                    </div>
                        :
                        <div className={style.nonDataWrapper}>
                            <h5>Loading...</h5>
                        </div>
            }
        </table>
    )
}

export default AccountsTableList