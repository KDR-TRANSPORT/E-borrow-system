import axios from "axios";

export const getLabtopsData = async () =>
  await axios.get(`http://192.168.0.145:8080/api/laptops`);

export const addLabtopData = async () =>
  await axios.post(`http://192.168.0.145:8080/api/laptops`);

export const deleteLabtopData = async () =>
  await axios.delete(`http://192.168.0.145:8080/api/laptops`);
