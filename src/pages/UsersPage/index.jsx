import React, { useEffect, useState } from 'react';
import styles from './UsersPage.module.scss';
import $api from '../../api/http';

function UsersPage() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [usersList, setUsersList] = useState([]);

    const handleCreate = async (e) => {
        e.preventDefault();
        await $api.post("/users", {
            username: name, pass, roleId: 1, statusId: 1
        });
        setName("");
        setPass("");
        fetchUsers();
    };

    const fetchUsers = async () => {
        const res = await $api.get("/users");
        setUsersList(res.data);
    };

    const handleDelete = async (id) => {
        const res = await $api.delete("/users/" + id);
        setUsersList(res.data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2 className={styles.title}>Create User</h2>
                <form className={styles.form} onSubmit={handleCreate}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>Create</button>
                </form>
            </div>
            <h1>Exist Users</h1>
            <div className={styles.tableWrapper}>
                {usersList.length > 0 ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((el) => (
                                <tr key={el.id}>
                                    <td>{el.id}</td>
                                    <td>{el.username}</td>
                                    <td><button
                                        onClick={() => handleDelete(el.id)}
                                    >Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className={styles.nonDataWrapper}>
                        <h5>No Users Found</h5>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UsersPage;
