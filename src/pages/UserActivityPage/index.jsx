import React, { useEffect, useState } from 'react';
import styles from './UserActivitypage.module.scss';
import $api from '../../api/http';

function UserActivityPage() {
    const [activities, setActivities] = useState([]);

    const fetchActivities = async () => {
        const res = await $api.get("/useractivities");
        setActivities(res.data);
    };

    useEffect(() => {
        fetchActivities();
    }, []);


    return (
        <div className={styles.container}>
            {activities.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            {/* <th>User ID</th> */}
                            <th>Login</th>
                            <th>Logout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity) => (
                            <tr key={activity.id}>
                                <td>{activity.id}</td>
                                {/* <td>{activity.userid}</td> */}
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
