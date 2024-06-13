import { useState } from "react";
import $api from "../api/http";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchTransactionsData = async () => {
    setLoading(true);
    try {
      const res = await $api.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      setLoading(false);
    }
  };

  // http://localhost:8000/transactions/filterByDateTime?startDate=2024-06-10

  const fetchByTimeCriteria = async (startDate, endDate) => {
    if (startDate !== null && endDate !== null) {
      try {
        const params = new URLSearchParams();
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        const res = await $api.get(
          `/transactions/filterByDateTimeRange?${params.toString()}`
        );
        setTransactions(res.data);
      } catch (error) {
        console.error("Failed to fetch transactions by time criteria", error);
      } finally {
        setLoading(false);
      }
    } else if (startDate !== null) {
      try {
        const res = await $api.get(
          `/transactions/filterByDateTime?startDate=${startDate}`
        );
        setTransactions(res.data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return {
    isLoading,
    transactions,
    fetchTransactionsData,
    fetchByTimeCriteria,
  };
};

export default useTransactions;
