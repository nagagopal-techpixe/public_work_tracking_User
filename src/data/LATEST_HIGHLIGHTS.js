import axios from "axios";

const API_BASE_URL = "https://your-api-url.com"; // replace with your API

export const getAllEvents = async (params) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/work_tracking/auth/user/GetAllWorks`,
      { params }
    );
    return response.data; // return actual data
  } catch (error) {
    console.error("Error fetching events:", error);
    return []; // return empty array on error
  }
};

