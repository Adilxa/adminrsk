import { useCallback, useEffect, useState } from "react";
import $api from "../api/http";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [isFilteringLoading, setFlteringLoading] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await $api.get("/accounts");
      setAccounts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchByStatus = async (status) => {
    setFlteringLoading(true);
    try {
      const res = await $api
        .get(`/accounts/filter?statusName=${status}`)
        .then((res) => {
          setAccounts(res?.data);
          setFlteringLoading(false);
        });
      return res?.data;
    } catch (error) {
      console.error(error);
    } finally {
      setFlteringLoading(false);
    }
  };

  return {
    isFilteringLoading,
    accounts,
    isLoading,
    fetchAccounts,
    fetchByStatus,
    setAccounts,
  };
};
