import axios from "axios";

import { URL } from "../../app/constant";

const token = localStorage.getItem("token");


// Register user
const createUser = async (userData) => {
  const response = await axios.post(`${URL}customers`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${URL}customers/login`, userData);
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
  
    const response = await axios.get(`${URL}customers`, config);
    return response.data;
  };
  
  // Get user by id
  const getUserById = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(`${URL}customers/${id}`, config);
    return response.data;
};


  // Get user by number
  const getUserByNumber = async (number) => {  
    const response = await axios.get(`${URL}customers/number/${number}`);
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
  
    const response = await axios.delete(`${URL}customers/${id}`, config);
    return response.data;
};
  
const customerService = {
    createUser,
    logout,
    login,
    getAllUsers,
  getUserById,
  getUserByNumber,
    updateUser,
    deleteUser,
  };
  
  export default customerService;