import { Routes, Route } from "react-router-dom"
import AuthPage from "../pages/AuthPage";
import NotFound from "../pages/NotFound";
import NavBar from "../components/NavBar";
import PageContainer from './../components/PageContainer/index';
import CompaniesPage from './../pages/CompaniesPage/index';
import TransactionsPage from "../pages/TransactionsPage";
import AccountsPage from "../pages/AccountsPage";
import UsersPage from "../pages/UsersPage";
import UserActivityPage from "../pages/UserActivityPage";
import HistoryPage from "../pages/HistoryPage";
import ReportPage from "../pages/ReportPage";


const useRoutes = (isAuth) => {
    if (!isAuth) {
        return (
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="*" element={<AuthPage />} />
            </Routes>
        )
    }

    return (
        <section style={{ display: "flex" }}>
            <NavBar />
            <main style={{ width: "100%" }}>
                <Routes>
                    <Route path="/" element={<PageContainer> <CompaniesPage /></PageContainer>} />
                    <Route path="/transactions" element={<PageContainer><TransactionsPage /></PageContainer>} />
                    <Route path="/accounts" element={<PageContainer><AccountsPage /></PageContainer>} />
                    <Route path="/users" element={<PageContainer><UsersPage /></PageContainer>} />
                    <Route path="/useractivity" element={<PageContainer><UserActivityPage /></PageContainer>} />
                    <Route path="/installedhistory" element={<PageContainer><HistoryPage /></PageContainer>} />
                    <Route path="/reports" element={<PageContainer><ReportPage /></PageContainer>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </section>
    )
}


export default useRoutes;


