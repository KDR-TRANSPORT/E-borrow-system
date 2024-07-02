import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_PORT;

export const getEquipmentsData = async () =>
  await axios.get(`${API_URL}/borrows`);

export const getSingleEquipmentData = async (id) =>
  await axios.get(`${API_URL}/borrows/${id}`);

export const getMarkedEquipmentData = async (id) =>
  await axios.get(`${API_URL}/borrowdevicesbyborrowid/${id}
`);

export const addEquipmentsData = async (formData) => {
  return await axios.post(`${API_URL}/borrows`, formData);
};
export const editEquipmentsData = async (formData, id) => {
  return await axios.put(`${API_URL}/borrows/${id}`, formData);
};
