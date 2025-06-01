"use client";
import React, { useEffect, useState } from "react";
import { RazorpayOptions } from "@/types";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { createTransaction } from "@/utils/paymentUtil";
import { toast } from "react-toastify";
export default function PaymentButton({
  formData,
  setErrors,
  data,
  user,
  total,
}) {
  const router = useRouter();
  const [paymentLoading, setPaymentLoading] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.street) newErrors.street = "Street address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode || !/^\d{5,6}$/.test(formData.pincode))
      newErrors.pincode = "Valid ZIP code is required (5-6 digits)";
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    localStorage.setItem("address", JSON.stringify(formData));
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    if (!user?.id || !data?.price) {
      toast.error("User ID or total missing");
      return;
    }
    
    let res
    setPaymentLoading(true);
    try{
    res = await fetch(`api/payment/makePayment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 100,
        userId: user.id,
      }),
    });
    console.log(res)
  }catch(error){
    toast.error(error)
    setPaymentLoading(false)
    return
  }
    const { order } = await res.json();
    const options: RazorpayOptions = {
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: data.price * 100,
      currency: "INR",
      name: "Scentdazzle",
      description: `Payment from ${user?.id}: ${data?.price}`,
      order_id: order.id,
      handler: async function (response) {
        const verifyData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        const responseVerify = await fetch(`api/payment/verifyPayment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(verifyData),
        });

        let status = "Pending";
        if (responseVerify.ok) {
          status = "Completed";
          router.push("/payments/success");
        } else {
          status = "Failed";
          router.push("/payments/failure");
          setPaymentLoading(false);
          return;
        }

        const orderDetails = {
          cart: data.cart,
          userId: user?.id,
        };

        const { name, email, ...sendData } = formData;
        console.log(formData);
        
        const transxnId = await createTransaction({
          userId: user?.id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          subtotal: data?.price || 0,
          orderDetails: orderDetails,
          status: status,
          address: sendData,
        });

        const emaildata = {
          name: name,
          email: email,
          transactionId: transxnId,
          cartdata: data,
          address: sendData,
        };
        try {
          await fetch(`/sendemail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emaildata),
          });
        } catch (error) {
          toast.error("Error occurred", error);
        }

        try {
          await fetch("/api/users/deletecart", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user?.id }), // Sending userId as payload in the request body
          });
        } catch (error) {
          toast.error("Error occurred", error);
        }
        setPaymentLoading(false);
      },

      prefill: {
        name: formData.name,
        contact: "",
      },
      theme: { color: "#3182CE" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setPaymentLoading(false);
  };
  return (
    <div className="mt-4 sm:mt-6 md:mt-8 border-t border-gray-700 pt-3 sm:pt-4 md:pt-6">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Subtotal: ₹ {total}
      </p>
      <button
  onClick={handlePayment}
  className="mt-3 sm:mt-4 md:mt-6 w-full bg-yellow-500 text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-md hover:bg-yellow-600 transition-colors duration-200 font-semibold text-sm sm:text-base md:text-lg flex justify-center items-center"
>
  {paymentLoading ? (
    <Loader2 className="animate-spin text-black dark:text-white h-6 w-6" style={{ animationDuration: "500ms" }} />
  ) : (
    "Proceed to Checkout"
  )}
</button>

    </div>
  );
}
