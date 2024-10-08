import React, { useState } from 'react';
import style from "./AuthPage.module.scss";
import Logo from "../../assets/logoishker.svg";
import $api from '../../api/http';
import { useNavigate } from 'react-router';

function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [res, setRes] = useState("")

    // const { onSignIn } = useAuth();

    const navigate = useNavigate();


    const onSignIn = async (e) => {
        e.preventDefault()
        const res = await $api.post("/users/login", {
            username: email,
            pass: password,
        })

        if (res.data !== false) {
            localStorage.setItem("isAuth", true);
            localStorage.setItem("user", email)
            localStorage.setItem("chatId", res.data.chatId)
            navigate("/")

            window.location.reload()
        } else {
            setRes("Wrong name or pass")
        }
    }

    return (
        <div className={style.container}>
            <div className={style.signInSection}>
                <form onSubmit={(e) => onSignIn(e)} className={style.signInForm}>
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
                    {res}
                </form>
            </div>
            <div className={style.welcomeSection}>
                <img src={Logo} alt="Logo" />
            </div>
        </div >
    );
}

export default AuthPage;
