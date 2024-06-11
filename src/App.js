import "./App.css";
import useRoutes from "./hooks/useRoutes";
import Preloader from "./components/Preloader/index";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuth, isLoading } = useAuth();
  const routes = useRoutes(isAuth);

  if (isLoading) {
    return <Preloader full />;
  }
  return <div className="App">{routes}</div>;
}

export default App;
