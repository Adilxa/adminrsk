import React, { useState } from 'react';
import style from "./AuthPage.module.scss";
import Logo from "../../assets/logoishker.svg";
import useAuth from '../../hooks/useAuth';

function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { onSignIn } = useAuth();

    return (
        <div className={style.container}>
            <div className={style.signInSection}>
                <form onSubmit={() => onSignIn(email, password)} className={style.signInForm}>
                    <h2>Привет Админ!</h2>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        required
                        placeholder='почта@'
                        value={email}
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                        placeholder='пароль'
                        value={password}
                    />
                    <button type="submit">
                        <p>Войти</p>
                    </button>
                </form>
            </div>
            <div className={style.welcomeSection}>
                <img src={Logo} alt="Logo" />
            </div>
        </div >
    );
}

export default AuthPage;
