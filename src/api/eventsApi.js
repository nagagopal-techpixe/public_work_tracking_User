import axios from "axios";

export const API_BASE_URL = "http://localhost:3007";

export const getAllEvents = async (params = {}) => {
  return axios.get(
    `${API_BASE_URL}/work_tracking/auth/user/GetAllWorks`,
    {
      params: {
        verified: true,
        ...params,
      },
    }
  );
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

// Submit Contact Form
export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/work_tracking/auth/user/submit-contact-form`,
      formData
    );
    console.log("Contact form submitted successfully:", response.data);
    return response.data;

  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};


// Submit Newsletter Email
export const submitNewsletter = async (emailData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/work_tracking/auth/user/add-newsletter`,
      emailData
    );

    console.log("Newsletter subscribed successfully:", response.data);
    return response.data;

  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
};
