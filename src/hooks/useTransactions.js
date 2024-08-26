import { useState } from "react";
import $api from "../api/http";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchTransactionsData = async () => {
    try {
      const res = await $api.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
    }
  };

  const fetchByTimeCriteria = async (startDate, endDate) => {
    if (startDate !== null && endDate !== null) {
      try {
        const params = new URLSearchParams();
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        const res = await $api.get(
          `/transactions/filterByDateTimeRange?${params.toString()}`
        );
        console.log(res.data);
        setTransactions(res.data);
      } catch (error) {
        console.error("Failed to fetch transactions by time criteria", error);
      } finally {
        setLoading(false);
      }
    } else if (startDate !== null) {
      try {
        const res = await $api.get(
          `/transactions/filterByDateTimeRange?startDate=${startDate}`
        );
        setTransactions(res.data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const fetchByStatus = async status => {
    const params = new URLSearchParams();
    try {
      if (status) params.append("status", status);
      console.log(params.toString());
      const res = await $api.get(`/transactions/filter?status=${status}`);
      setTransactions(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchByType = async status => {
    const params = new URLSearchParams();
    try {
      if (status) params.append("type", status);
      console.log(params.toString());
      const res = await $api.get(`/transactions/filter?type=${status}`);
      setTransactions(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isLoading,
    transactions,
    fetchTransactionsData,
    fetchByTimeCriteria,
    fetchByStatus,
    fetchByType,
  };
};

export default useTransactions;
