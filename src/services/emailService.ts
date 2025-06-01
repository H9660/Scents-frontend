import { emailData } from "@/types";
import axios from "axios";
const EMAIL_URL = "/sendmail";

const sendEmail = async (data: emailData) => {
  console.log("sfsdf")
  const response = await axios.post(EMAIL_URL, data);
  return response.data;
};

const emailService = {
  sendEmail
};
export default emailService;
