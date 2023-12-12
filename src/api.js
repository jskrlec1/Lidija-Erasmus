import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Postavite svoj baseURL ovdje
});

export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
