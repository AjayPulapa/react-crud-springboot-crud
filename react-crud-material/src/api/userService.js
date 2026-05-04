import axios from "axios";

const API_URL = "http://localhost:8080/users";

const handleError = (error) => {
  if (error.response) {
    throw new Error("Server Error");
  }
  if (error.request) {
    throw new Error("Network Error");
  }
  throw new Error(error.message);
};

export const getUsers = async (page, limit) => {
  try {
    const res = await axios.get(
      `${API_URL}?page=${page - 1}&size=${limit}`
    );

    return {
      data: res.data.content,
      total: res.data.totalElements
    };
  } catch (e) {
    handleError(e);
  }
};

export const createUser = async (user) => {
  try {
    return (await axios.post(API_URL, user)).data;
  } catch (e) {
    handleError(e);
  }
};

export const updateUser = async (id, user) => {
  try {
    return (await axios.put(`${API_URL}/${id}`, user)).data;
  } catch (e) {
    handleError(e);
  }
};

export const deleteUser = async (id) => {
  console.log(id);  
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (e) {
    handleError(e);
  }
};