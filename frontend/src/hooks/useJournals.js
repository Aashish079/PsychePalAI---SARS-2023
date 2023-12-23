import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient.js";

const useJournals = (endpoint) => {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const fetchJournals = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(endpoint);
      setJournals(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
}
  
  useEffect(() => {
    fetchJournals();
  }, []);

  return {
    journals,
    error,
    isLoading,
  };
};

export default useJournals;
