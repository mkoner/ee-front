import axios from "axios";

import { URL } from "../../app/constant";

// create a category
const createCategory = async (category, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${URL}categories`, category, config);
  return response.data;
};

// Get all categories
const getAllCategories = async () => {
  
    const response = await axios.get(`${URL}categories`);
    return response.data;
  };
  
  // Get category by id
  const getCategoryById = async (id) => {
  
    const response = await axios.get(`${URL}categories/id/${id}`);
    return response.data;
};
  
// Update category
const updateCategory = async (id, category, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.put(`${URL}categories/${id}`, category, config);
    return response.data;
};
  
// Delete User
const deleteCategory = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.delete(`${URL}categories/${id}`, config);
    return response.data;
};
  
const categoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
  };
  
  export default categoryService;