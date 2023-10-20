import axios from "axios";

import { URL } from "../../app/constant";

// create a line item
const createLineItem = async (line) => {
  const response = await axios.post(`${URL}line-items`, line);
  return response.data;
};

// Get all line items
const getAllLineItems = async () => {
  
    const response = await axios.get(`${URL}line-items`);
    return response.data;
  };
  
  // Get line item by id
  const getLineItemById = async (id) => {
  
    const response = await axios.get(`${URL}line-items/${id}`);
    return response.data;
};
  
// Update line item
const updateLineItem = async (id, line) => {
  const response = await axios.put(`${URL}line-items/${id}`, line);
    return response.data;
};
  
// Delete line item
const deleteLineItem = async (id, token) => {
  
    await axios.delete(`${URL}line-items/${id}`);
    return id;
};
  
const lineItemService = {
    createLineItem,
    getAllLineItems,
    getLineItemById,
    updateLineItem,
    deleteLineItem,
};
   
export default lineItemService;