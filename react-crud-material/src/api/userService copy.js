import axios from "axios";

const API_URL = "http://localhost:3001/users";

/* ===========================
   DTO + RESPONSE DTO (INLINE)
   =========================== */

// 👉 Request DTO
const UserDTO = {
  toRequest: (user) => ({
    name: user.name,
    email: user.email
  })
};

// 👉 Response DTO
const UserResponseDTO = {
  fromResponse: (user) => ({
    id: user.id,
    name: user.name,
    email: user.email
  }),

  fromList: (users = []) =>
    users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email
    }))
};

/* ===========================
   ERROR HANDLING
   =========================== */

const handleError = (error) => {
  if (error.name === "CanceledError") {
    throw new Error("Request Cancelled");
  }
  if (error.response) {
    throw new Error("Server Error");
  }
  if (error.request) {
    throw new Error("Network Error");
  }
  throw new Error(error.message);
};

/* ===========================
   API METHODS
   =========================== */

export const getUsers = async (page, limit, signal) => {
  try {
    const res = await axios.get(
      `${API_URL}?_page=${page}&_limit=${limit}`,
      { signal }
    );

    console.log("RAW:", res.data);

    return {
      data: UserResponseDTO.fromList(res.data), // ✅ array mapping
      total: res.headers["x-total-count"] || res.data.length
    };
  } catch (e) {
    handleError(e);
    return { data: [], total: 0 };
  }
};

export const createUser = async (user, signal) => {
  try {
    const dto = UserDTO.toRequest(user);

    const res = await axios.post(API_URL, dto, { signal });
    return UserResponseDTO.fromResponse(res.data);
  } catch (e) {
    handleError(e);
  }
};

export const updateUser = async (id, user, signal) => {
  try {
    const dto = UserDTO.toRequest(user);

    const res = await axios.put(`${API_URL}/${id}`, dto, { signal });

    return UserResponseDTO.fromResponse(res.data);
  } catch (e) {
    handleError(e);
  }
};

export const deleteUser = async (id, signal) => {
  try {
    await axios.delete(`${API_URL}/${id}`, { signal });
  } catch (e) {
    handleError(e);
  }
};