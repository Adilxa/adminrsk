import React from 'react';
import style from "./companies.module.scss";

function CompaniestableList({ companiesArray, loading }) {

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
                    {loading ? (
                        Array.from({ length: 10 }).map((_, index) => (
                            <tr key={index} className={style.skeletonRow}>
                                <td className={style.skeletonCell}></td>
                                <td className={style.skeletonCell}></td>
                                <td className={style.skeletonCell}></td>
                                <td className={style.skeletonCell}></td>
                                <td className={style.skeletonCell}></td>
                            </tr>
                        ))
                    ) : (
                        companiesArray.map((el) => (
                            <tr key={el.id}>
                                <td>{el.id}</td>
                                <td>{el.inn}</td>
                                <td>{el.kkm}</td>
                                <td>{el.status.statusName}</td>
                                <td>{el.statusRegistration.statusName}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </main>
    );
}

export default CompaniestableList;
