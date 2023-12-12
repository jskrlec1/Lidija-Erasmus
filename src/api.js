import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "postgres://lwgxcprfmhnbvu:ce5f1bd0c0be2c340304a7cc4cc1ac660daef0f08851f05b510e4dfe4267c58b@ec2-3-232-218-211.compute-1.amazonaws.com:5432/de7qfcf7mujcbl", // Zamijenite s vašim dobivenim URL-om i portom
});

export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
