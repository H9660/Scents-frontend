import axios from "axios";
import { perfumeUpdateDataFormat } from "../slices/types.ts";
const API_URL = "api/perfume/";

const createperfume = async (perfumeData: perfumeUpdateDataFormat) => {
  try {
    const response = await axios.post(API_URL + "add", perfumeData);
    return response.data;
  } catch (err: unknown) {
    console.log(err)
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
  } catch (err: unknown) {
     console.log(err)
  }
};
// Get perfumes
const getperfumes = async () => {
  try {
    const response = await axios.get(API_URL + "all");
    console.log(response.data)
    if (response.data) return response.data;
  } catch (err: unknown) {
    console.log(err)
  }
};


const updateperfume = async (perfumedata: perfumeUpdateDataFormat) => {
  try {
    const response = await axios.put(API_URL + "update/", perfumedata);
    return response.data;
  } catch (err: unknown) {
    console.log(err)
  }
};

const perfumeService = {
  createperfume,
  getperfume,
  getperfumes,
  updateperfume,
};

export default perfumeService;
