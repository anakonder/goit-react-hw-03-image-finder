import axios from "axios";

export const BASE_URL = "https://pixabay.com/api/"
const API_KEY = "36981447-281557b64426541a1312b4aee";

const api = axios.create({
    baseURL: BASE_URL,
    params: {
      key: API_KEY,
      perPage: 12
  },

})

export const getImages = async (query, page,) => {
  try {
    console.log("Параметри які потрібні для запита", query, page)
    const response = await api.get(`?q=${query}&page=${page}&image_type=photo&orientation=horizontal&`);
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return null;
  }
};


export default api;