import axios from "axios";

export const getLabtopsData = async () =>
  await axios.get(`http://192.168.0.145:8080/api/laptops`);

export const getSingleLabtopsData = async (id) =>
  await axios.get(`http://192.168.0.145:8080/api/laptops/${id}`);

export const addLabtopData = async (formDataNew) => {
  return await axios.post(
    `http://192.168.0.145:8080/api/laptops`,
    formDataNew,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export const editLabtopData = async (id, formDataNew) => {
  return await axios.put(
    `http://192.168.0.145:8080/api/laptops/${id}`,
    formDataNew,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deleteLabtopData = async () =>
  await axios.delete(`http://192.168.0.145:8080/api/laptops`);
