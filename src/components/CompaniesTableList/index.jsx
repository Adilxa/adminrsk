import React from 'react';
import style from "./companies.module.scss";

function CompaniestableList({ companiesArray, loading, error }) {

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
                {loading ? (
                    <div colSpan="5" className={style.loadingWrapper}></div>
                ) : (
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

                )}

                {error && (
                    <div colSpan="5" className={style.errorWrapper}>No Data Yet</div>
                )}

            </table>
        </main >
    );
}

export default CompaniestableList;
