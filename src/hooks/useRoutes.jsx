import { Routes, Route } from "react-router-dom"
import AuthPage from "../pages/AuthPage";
import NotFound from "../pages/NotFound";
import NavBar from "../components/NavBar";
import PageContainer from './../components/PageContainer/index';
import CompaniesPage from './../pages/CompaniesPage/index';
import TransactionsPage from "../pages/TransactionsPage";


const useRoutes = (isAuth) => {
    if (!isAuth) {
        return (
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="*" element={<NotFound />} />
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
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </section>
    )
}


export default useRoutes;


