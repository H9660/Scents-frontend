import axios from "axios";
interface perfumeDataFormat {
  name?: string;
  price?: number;
  quantity?: string;
  imageUrl?: string;
  tags: string[];
}
const API_URL = "api/perfume/";

const createperfume = async (perfumeData: perfumeDataFormat) => {
  try {
    const response = await axios.post(API_URL + "add", perfumeData);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getperfume = async (name: string) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        name: name,
      },
    });
    if (response.data) return response.data;
  } catch (err) {
    console.error("Error occurred:", err);
  }
};
// Get perfumes
const getperfumes = async () => {
  try {
    const response = await axios.get(API_URL + "all");
    console.log(response.data)
    if (response.data) return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};


const updateperfume = async (perfumedata: perfumeDataFormat) => {
  try {
    const response = await axios.put(API_URL + "update/", perfumedata);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const calcbatchPrice = async (data)=>{
  try {
    const response = await axios.post(API_URL + "calcbatchprice", data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
const perfumeService = {
  createperfume,
  getperfume,
  getperfumes,
  updateperfume,
  calcbatchPrice
};

export default perfumeService;
