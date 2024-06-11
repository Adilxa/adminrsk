import { useState } from "react";
import $api from "../api/http";

const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchCompanies = async (filters = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const url = query ? `companies?${query}` : "companies";
      const res = await $api.get(url);
      setCompanies(res.data);
      setLoading(false);
      setError(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  return {
    isLoading,
    error,
    companies,
    fetchCompanies,
  };
};

export default useCompanies;
