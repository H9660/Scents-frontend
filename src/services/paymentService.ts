import axios from "axios";
const USER_URL = "/api/payment/";

interface paymentData {
  userId?: string;
  amount: number;
}

interface verifyData {
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string
}
const makepayment = async (data: paymentData) => {
  const userpaymentdata = {
    userId: data.userId,
    amount: data.amount,
  };

  const response = await axios.post(USER_URL + "makePayment", userpaymentdata);
  return response.data;
};

const verifypayment = async (data: verifyData) => {
  const verifyPaymentData = {
    razorpay_payment_id: data.razorpay_payment_id,
    razorpay_order_id: data.razorpay_order_id,
    razorpay_signature: data.razorpay_signature,
  };

  const response = await axios.post(USER_URL + "verifyPayment", verifyPaymentData);
  return response.data;
};

const paymentService = {
  makepayment,
  verifypayment,
};
export default paymentService;
