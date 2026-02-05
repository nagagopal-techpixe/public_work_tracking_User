import axios from "axios";

const API_BASE_URL = "http://localhost:3007";

export const getAllEvents = async (params) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/work_tracking/auth/user/GetAllWorks`,
      { params } // axios will auto build query string
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
export const getAllConstituencies = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/work_tracking/auth/user/GetAllConstituencies`)
    // console.log(response.data);
    return response.data;
  }
  catch(error){
    console.error("Error fetching constituencies:", error);

  }
}

export const GetAllMandalsByConstituencyId = async (constituencyId) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/work_tracking/auth/user/GetAllMandals/${constituencyId}`)
    // console.log(response.data);
    return response.data;
  }
  catch(error){
    console.error("Error fetching mandals:", error);
  }
}

export const GetAllVillagesByMandalId = async (mandalId) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/work_tracking/auth/user/GetAllVillages/${mandalId}`);
    // console.log(response.data);
    return response.data;
  }
  catch(error){
    console.error("Error fetching villages:", error);
  }
}

export const GetAllHabitationsByVillageId = async (villageId) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/work_tracking/auth/user/GetAllHabitations/${villageId}`);
    // console.log(response.data);
    return response.data;
  }
  catch(error){
    console.error("Error fetching habitations:", error);
  }
}
///work_tracking/auth/user/GetWorkById/{id}
export const getWorkById = async (id) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/work_tracking/auth/user/GetWorkById/${id}`);
    // console.log(response.data);
    return response.data; 
  }
  catch(error){
    console.error("Error fetching work by id:", error);
  }

}
export const getAllNews = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/work_tracking/auth/user/get-all-news`
    );

    return response.data;

  } catch (error) {
    console.error("Error fetching news:", error);
    throw error; // important for UI handling
  }
};

// Get News By ID
export const getNewsById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/work_tracking/auth/user/get-news-id/${id}`
    );

    return response.data;

  } catch (error) {
    console.error("Error fetching news by id:", error);
    throw error;
  }
};
