import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_PORT;


console.log('api', API_URL);
export const getLabtopsData = async () => await axios.get(`${API_URL}/laptops`);

export const getSingleLabtopsData = async (id) =>
  await axios.get(`${API_URL}/laptops/${id}`);

export const addLabtopData = async (formDataNew) => {
  return await axios.post(`${API_URL}/laptops`, formDataNew, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editLabtopData = async (id, formDataNew) => {
  return await axios.put(`${API_URL}/laptops/${id}`, formDataNew);
};

export const addSingleImageLabtopData = async (id, formData) => {
  return await axios.post(`${API_URL}/laptopimages/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteLabtopData = async () =>
  await axios.delete(`${API_URL}/laptops`);
