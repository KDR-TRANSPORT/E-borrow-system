import axios from "axios";

export const getEquipmentsData = async () =>
  await axios.get(`http://192.168.0.145:8080/api/borrows`);

export const getSingleEquipmentData = async (id) =>
  await axios.get(`http://192.168.0.145:8080/api/borrows/${id}`);

export const getMarkedEquipmentData = async (id) =>
  await axios.get(`http://192.168.0.145:8080/api/borrowdevicesbyborrowid/${id}
`);

export const addEquipmentsData = async (formData) => {
  return await axios.post(`http://192.168.0.145:8080/api/borrows`, formData);
};
export const editEquipmentsData = async (formData, id) => {
  return await axios.put(
    `http://192.168.0.145:8080/api/borrows/${id}`,
    formData
  );
};
