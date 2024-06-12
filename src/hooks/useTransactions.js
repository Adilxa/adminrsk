import { useState } from "react";
import $api from "../api/http";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchTransactionsData = async () => {
    setLoading(true);
    try {
      await $api.get("/transactions").then((res) => {
        setLoading(false);
        setTransactions(res.data);
      });
    } catch {
      setLoading(false);
    }
  };

  const fetchByTimeCriteria = async (startDate, endDate) => {
    setLoading(true);
    try {
      if (startDate !== null) {
        await $api
          .get(`/transactions/filterByDateTimeRange?${startDate}`)
          .then((res) => {
            setTransactions(res.data);
            setLoading(false);
          });
      }
    } catch {
      setLoading(false);
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
