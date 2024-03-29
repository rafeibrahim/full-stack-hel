import axios from "axios";
//const baseUrl = "http://localhost:3001/api/persons";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => {
    console.log('response.data', response.data);
    return response.data;
  });
};

const create = newObject => {
    return axios.post(baseUrl, newObject).then((response) => {
        return  response.data;
    });
};

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then((response) => {
        return response.data
    })
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => {
    console.log('response.data from remove', response.data)
    return response.data;
  })
};

export default {getAll, create, update, remove};

