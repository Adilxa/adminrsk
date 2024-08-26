import React, { useMemo } from 'react';
import style from "./navbar.module.scss";
import { navbarData } from './../../constants/navbar.data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/logoishker.svg"


function NavBar() {

    const location = useLocation()
    const navigate = useNavigate();

    const chatId = localStorage.getItem("chatId")

    const logout = () => {
        localStorage.setItem("isAuth", false)
        localStorage.setItem("user", "")
        window.location.reload()
        navigate("/")
    }

    const renderTabs = useMemo(() =>
        navbarData.map((el) => (
            el.isLink ? <a href={el.link} className={style.activeLink} style={{ background: "#229ED9" }} target='_blank' rel='norefferer'>{chatId ? "Telegram Connected ⚡" : el.title}</a> :
                <Link key={el.title} to={el.link} className={location.pathname == el.link ? style.activeLink : style.nonActiveLink}>
                    {el.title}
                </Link>
        ))
        , [location])

    return (
        <aside className={style.wrapper}>
            <img src={logo} alt="logo" />
            <div>
                {renderTabs}
            </div>
            <button onClick={logout} className={style.logout}>Logout</button>
        </aside>
    )
}

export default NavBar