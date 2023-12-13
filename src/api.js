import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "/api/save-data", // Zamijenite s vašim dobivenim URL-om i portom
});

export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
