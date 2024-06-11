import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuth, setAuth] = useState(false);
  const [userData, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const onSignIn = (email, password) => {
    setLoading(true);
    if (email) {
      const res = { data: { email, password } };
      setData(res.data);
      localStorage.setItem("isAuth", true);
      setLoading(false);
      return true;
    } else {
      localStorage.setItem("isAuth", false);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    const res = localStorage.getItem("isAuth");
    if (JSON.parse(res)) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return {
    isAuth,
    userData,
    isLoading,
    onSignIn,
  };
};

export default useAuth;
