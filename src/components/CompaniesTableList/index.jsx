import React from 'react';
import style from "./companies.module.scss";

function CompaniestableList({ companiesArray }) {
    console.log('Rendering companies:', companiesArray);  // Add this log to check the received data
    return (
        <main className={style.wrapper}>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>INN</th>
                        <th>KKM</th>
                        <th>Status Name</th>
                        <th>Registration Status Name</th>
                    </tr>
                </thead>
                <tbody>
                    {companiesArray.map((el) => (
                        <tr key={el.id}>
                            <td>{el.id}</td>
                            <td>{el.inn}</td>
                            <td>{el.kkm}</td>
                            <td>{el.status.statusName}</td>
                            <td>{el.statusRegistration.statusName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}

export default CompaniestableList;
