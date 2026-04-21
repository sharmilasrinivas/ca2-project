import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async (id, password) => {
  const res = await axios.post(`${BASE_URL}/public/token`, {
    studentId: id,
    password: password,
  });
  return res.data.token;
};

export const getOrders = async (token) => {
  const res = await axios.get(`${BASE_URL}/private/data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};