import axios from "axios";

import { URL } from "../../app/constant";

// add files
const uploadFile = async (file, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${URL}files/upload`, file, config);
  return response.data;
};

// download file
  const downloadFile = async (id) => {

    const response = await axios.get(`${URL}files/download/${id}`);
    return response.data;
};
 
const fileService = {
    uploadFile,
    downloadFile,
  };
  
  export default fileService;