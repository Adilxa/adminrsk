import React, { useEffect, useState } from 'react';
import ReportButton from "../../components/ReportButton";
import $api from '../../api/http';
import styles from './HistoryPage.module.scss';

function HistoryPage() {
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        const res = await $api.get("/history");
        setHistory(res.data);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div className={styles.container}>
            <ReportButton />
            <br />
            <br />
            <br />
            {history.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Date</th>
                            <th>Table</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.date}</td>
                                <td>{item.nametable}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className={styles.nonDataWrapper}>
                    <h5>No History Found</h5>
                </div>
            )}
        </div>
    );
}

export default HistoryPage;
