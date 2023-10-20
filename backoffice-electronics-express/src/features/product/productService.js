import axios from "axios";

import { URL } from "../../app/constant";

// create a product
const createProduct = async (product, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type':'multipart/form-data'
    },
  };
  const response = await axios.post(`${URL}products`, product, config);
  return response.data;
};

// Get all products paginated and filtered
const getAllProducts = async (filterString) => {  
  const response = await axios.get(`${URL}products${filterString}`);
    return response.data;
  };


  // Get all products
const getAllProducts1 = async () => {  
  const response = await axios.get(`${URL}products/all`);
    return response.data;
};
  
  // Get product by id
  const getProductById = async (id) => {
  
    const response = await axios.get(`${URL}products/${id}`);
    return response.data;
};
  
// Update product
const updateProduct = async (id, product, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.put(`${URL}products/${id}`, product, config);
    return response.data;
};
  
// Delete product
const deleteProduct = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.delete(`${URL}products/${id}`, config);
    return response.data;
};

// add images to product
const addFiles = async (id, files, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.post(`${URL}products/add_files/${id}`, files, config);
    return response.data;
};


// removes images to product
const deleteFile = async (pid, fid, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.delete(`${URL}products/delete_file/${pid}/${fid}`, config);
    return response.data;
};
  
const productService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addFiles,
    deleteFile,
};
   
export default productService;