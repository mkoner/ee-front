import axios from "axios";

import { URL } from "../../app/constant";



// Register user
const createUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${URL}admins`, userData, config);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${URL}admins/login`, userData);
  const token = response.headers.token;
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("token");
};

// Get all users
const getAllUsers = async (token) => {
    const config = { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(`${URL}admins`, config);
    return response.data;
  };
  
  // Get user by id
  const getUserById = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(`${URL}admins/${id}`, config);
    return response.data;
};
  
// Update user
const updateUser = async (id, user, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.put(`${URL}admins/${id}`, user, config);
    return response.data;
};
  
// Delete User
const deleteUser = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.delete(`${URL}admins/${id}`, config);
    return response.data;
};
  
const adminService = {
    createUser,
    logout,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  };
  
  export default adminService;