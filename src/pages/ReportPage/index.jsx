import React, { useEffect, useState } from 'react';
import $api from "../../api/http";
import styles from './ReportPage.module.scss';
import ReportButton from '../../components/ReportButton';

function ReportPage() {
    const [reports, setReports] = useState([]);
    const [reportsType, setReportsType] = useState([])
    const [reportStatus, setreportStatus] = useState([])

    const fetchReports = async () => {
        const res = await $api.get("/report/all");
        setReports(res.data);
    };

    const fetchReportsType = async () => {
        const res = await $api.get("/transactions/countT")
        setReportsType(res.data)
    }

    const fetchReportsStatus = async () => {
        const res = await $api.get("/transactions/countS")
        setreportStatus(res.data)
    }

    useEffect(() => {
        fetchReports();
        fetchReportsType()
        fetchReportsStatus()
    }, []);

    return (
        <div className={styles.container}>
            <ReportButton data={reports} />
            <div>
                <h2>Report Types</h2>
                <br />
                <div className={styles.report}>
                    <div>
                        Transaction: {reportsType[1]}
                    </div>
                    <div>
                        Chashing Out: {reportsType[2]}
                    </div>
                    <div>
                        Payments: {reportsType[3]}
                    </div>
                    <div>
                        Deposit: {reportsType[4]}
                    </div>
                </div>
            </div>
            <br />
            <div>
                <h2>Report Status</h2>
                <br />
                <div className={styles.report}>
                    <div>
                        Successfull: {reportStatus[1]}
                    </div>
                    <div>
                        Rejected: {reportStatus[2]}
                    </div>
                    <div>
                        Pending: {reportStatus[3]}
                    </div>

                </div>
            </div>
            <br />
            {reports.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Bank</th>
                            <th>Filial</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Total Turnover</th>
                            <th>KKM</th>
                            <th>Successful</th>
                            <th>Declined</th>
                            <th>Waiting</th>
                            <th>GNS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.bank}</td>
                                <td>{report.filial}</td>
                                <td>{report.prihod}</td>
                                <td>{report.rashod}</td>
                                <td>{report.summaOborota}</td>
                                <td>{report.kolichestvaip}</td>
                                <td>{report.uspeshno}</td>
                                <td>{report.otkloneno}</td>
                                <td>{report.ozhidanie}</td>
                                <td>{report.gns}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className={styles.nonDataWrapper}>
                    <h5>No Reports Available</h5>
                </div>
            )}
        </div>
    );
}

export default ReportPage;
