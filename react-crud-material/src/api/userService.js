import axiosInstance from "./axiosInstance";

// ✅ Get ALL users
export const getUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data.content; // Spring Boot Page OR full list
};

// ✅ Server Pagination (optional)
export const getUsersPagination = async (page, limit) => {
  const res = await axiosInstance.get("/users", {
    params: {
      page: page - 1,
      size: limit
    }
  });

  return {
    data: res.data.content,
    total: res.data.totalElements
  };
};

export const createUser = async (user) => {
  const res = await axiosInstance.post("/users", user);
  return res.data;
};

export const updateUser = async (id, user) => {
  const res = await axiosInstance.put(`/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id) => {
  await axiosInstance.delete(`/users/${id}`);
};