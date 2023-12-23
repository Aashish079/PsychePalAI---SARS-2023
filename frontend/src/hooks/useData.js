import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient.js";

const useData = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const fetchJournals = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(endpoint);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);
//   useEffect(() => {
//     console.log(data);
//   }, [data]);
  return {
    data,
    error,
    isLoading,
  };
};

export default useData;
