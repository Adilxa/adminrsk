import React from 'react'
import "./TransactionsTableList.module.scss"

function TransactionsTableList({ transactionsArray }) {


    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Summa</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    transactionsArray?.map((el) =>
                        <tr key={el.id}>
                            <td>{el.id}</td>
                            <td>{el.accountFrom.numberofschet}</td>
                            <td>{el.accountTo.numberofschet}</td>
                            <td>{el.amount}</td>
                            <td>{el.status.nameofstatus}</td>
                            <td>{el?.transactionDate?.split("T")[0]}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default TransactionsTableList