import axios from "axios";
//const baseUrl = "http://localhost:3000/api";
//const baseUrl = "https://phonebook-backend-withered-dew-1073.fly.dev/api";
const baseUrl = "/api"

const getAll = () => {
  return axios.get(`${baseUrl}/persons`);
};

const create = (newObject) => {
  return axios.post(`${baseUrl}/persons`, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/persons/${id}`, newObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/persons/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
};
