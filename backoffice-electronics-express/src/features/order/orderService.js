import axios from "axios";

import { URL } from "../../app/constant";

// create order
const createOrder = async (order) => {
  const response = await axios.post(`${URL}orders`, order);
  return response.data;
};

// Get all orders
const getAllOrders = async (token) => {
    const config = { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(`${URL}orders`, config);
    return response.data;
  };
  
  // Get order by id
  const getOrderById = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(`${URL}orders/${id}`, config);
    return response.data;
};
  
// Update order
const updateOrder = async (id, order, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.put(`${URL}orders/${id}`, order, config);
    return response.data;
};

// Cancel order
const cancelOrder = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.put(`${URL}orders/${id}/cancel`, config);
    return response.data;
};

// Delete order
const deleteOrder = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.delete(`${URL}orders/${id}`, config);
    return response.data;
};

// add line item to order
const addLineItem = async (oid, lid, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.put(`${URL}orders/${oid}/line-item/${lid}`, config);
    return response.data;
};


// removes line item from order
const removeLineItem = async (oid, lid, token) => {
    const config = {
      headers: {
        Authorization: `Kamtar ${token}`,
      },
    };
  
    const response = await axios.delete(`${URL}orders/${oid}/line-item/${lid}`, config);
    return response.data;
};
  
const orderService = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    cancelOrder,
    deleteOrder,
    addLineItem,
    removeLineItem,
};
   
export default orderService;