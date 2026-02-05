import axios from "axios";

const API_BASE_URL = "http://localhost:3007"; 

export const getAllEvents = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/work_tracking/auth/user/GetAllWorks`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
