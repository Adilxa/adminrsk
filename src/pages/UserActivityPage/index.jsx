import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './UserActivitypage.module.scss';
import $api from '../../api/http';
import TotalTime from '../../components/TotalTime';
import TotalAvarage from '../../components/TotalAvarage';

function UserActivityPage() {
    const [activities, setActivities] = useState([]);
    const [activitiesTime, setActivitiesTime] = useState([]);
    const [visitsPerDay, setVisitsPerDay] = useState([]);

    const fetchActivities = async () => {
        const res = await $api.get("/useractivities");
        setActivities(res.data);
    };

    const fetchActivitiesTime = async () => {
        const res = await $api.get("/useractivities/visits-per-hour");
        setActivitiesTime(res.data);
    };

    const fetchVisitsPerDay = async () => {
        const res = await $api.get("/useractivities/visits-per-day");
        setVisitsPerDay(res.data);
    };

    useEffect(() => {
        fetchActivities();
        fetchActivitiesTime();
        fetchVisitsPerDay();
    }, []);

    const hourChartData = activitiesTime.map((item) => ({
        hour: item[0],
        visits: item[1],
    }));

    const dayChartData = visitsPerDay.map((item) => ({
        day: `Day ${item[0]}`,
        visits: item[1],
    }));

    return (
        <div className={styles.container}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #534e9f", borderRadius: "10px", padding: "10px" }}>
                <h2>User Activity</h2>
                <div style={{ display: "flex", gap: "20px" }}>
                    <TotalTime />
                    <TotalAvarage />
                </div>
            </div>
            <br />
            <br />
            <br />
            <div>
                <h2>Visit per Hour</h2>
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={hourChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hour" label={{ value: 'Hour', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'Visits', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Bar dataKey="visits" fill="#534e9f" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div>
                <h2>Visits Per Day</h2>
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dayChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'Visits', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Bar dataKey="visits" fill="#71bf44" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>


            {activities.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User INN</th>
                            <th>Login</th>
                            <th>Logout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity) => (
                            <tr key={activity.id}>
                                <td>{activity.id}</td>
                                <td>{activity.user.inn}</td>
                                <td>{activity.logintimestamp}</td>
                                <td>{activity.logouttimestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className={styles.nonDataWrapper}>
                    <h5>No Activity Found</h5>
                </div>
            )}
        </div>
    );
}

export default UserActivityPage;
